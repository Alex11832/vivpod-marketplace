/**
 * ddiia-telegram-proxy
 *
 * Прокси между формами на сайте и Telegram Bot API.
 * Токен бота и chat_id хранятся только как Cloudflare Worker secrets
 * (env.TELEGRAM_BOT_TOKEN / env.TELEGRAM_CHAT_ID) и никогда не попадают
 * в код, отдаваемый браузеру.
 *
 * Ожидаемый запрос от сайта:
 *   POST /  { "title": "New contact message", "fields": { "Name": "...", ... } }
 */

const MAX_FIELDS = 20;
const MAX_FIELD_LENGTH = 2000;
const MAX_TITLE_LENGTH = 200;

function corsHeaders(origin) {
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Vary': 'Origin'
    };
}

function getAllowedOrigin(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '')
        .split(',')
        .map(o => o.trim())
        .filter(Boolean);

    return allowed.includes(origin) ? origin : null;
}

function jsonResponse(body, status, extraHeaders) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...(extraHeaders || {})
        }
    });
}

function sanitizeText(value) {
    if (value === undefined || value === null) return '';
    return String(value).slice(0, MAX_FIELD_LENGTH);
}

function buildMessage(title, fields, pageUrl) {
    const lines = [
        sanitizeText(title).slice(0, MAX_TITLE_LENGTH) || 'New form submission',
        `Page: ${sanitizeText(pageUrl)}`
    ];

    Object.entries(fields || {})
        .slice(0, MAX_FIELDS)
        .forEach(([label, value]) => {
            lines.push(`${sanitizeText(label)}: ${sanitizeText(value) || 'Not provided'}`);
        });

    return lines.join('\n');
}

export default {
    async fetch(request, env) {
        const allowedOrigin = getAllowedOrigin(request, env);

        // Preflight
        if (request.method === 'OPTIONS') {
            if (!allowedOrigin) {
                return new Response(null, { status: 403 });
            }
            return new Response(null, { status: 204, headers: corsHeaders(allowedOrigin) });
        }

        if (request.method !== 'POST') {
            return jsonResponse({ error: 'Method not allowed' }, 405);
        }

        if (!allowedOrigin) {
            return jsonResponse({ error: 'Origin not allowed' }, 403);
        }

        const headers = corsHeaders(allowedOrigin);

        if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
            return jsonResponse({ error: 'Server misconfigured' }, 500, headers);
        }

        let payload;
        try {
            payload = await request.json();
        } catch (e) {
            return jsonResponse({ error: 'Invalid JSON' }, 400, headers);
        }

        const { title, fields, pageUrl } = payload || {};

        if (!fields || typeof fields !== 'object') {
            return jsonResponse({ error: 'Missing fields' }, 400, headers);
        }

        const text = buildMessage(title, fields, pageUrl || request.headers.get('Referer') || '');
        const telegramUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        try {
            const tgResponse = await fetch(telegramUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: env.TELEGRAM_CHAT_ID,
                    text
                })
            });

            if (!tgResponse.ok) {
                const details = await tgResponse.json().catch(() => ({}));
                return jsonResponse(
                    { error: details.description || 'Telegram request failed' },
                    502,
                    headers
                );
            }

            return jsonResponse({ ok: true }, 200, headers);
        } catch (e) {
            return jsonResponse({ error: 'Failed to reach Telegram' }, 502, headers);
        }
    }
};
