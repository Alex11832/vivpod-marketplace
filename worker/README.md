# ddiia (Cloudflare Worker)

Прокси между формами на ddiia.com и Telegram Bot API. Токен бота и chat ID
хранятся как зашифрованные Worker secrets — их нет ни в этом репозитории,
ни в коде, который получает браузер.

Это тот же воркер, что обслуживает домен `ddiia.com` в Cloudflare —
`https://ddiia.geofakt.workers.dev`.

## Антиспам

Без внешних сервисов (Turnstile/капча не используется):

- **Honeypot**: скрытое CSS-ом поле `website` в форме. Реальные пользователи
  его не видят и не заполняют; боты, автозаполняющие все поля формы,
  попадаются на нём — сообщение тихо не отправляется.
- **Таймер**: если форма отправлена быстрее чем через 3 секунды после того,
  как стала видна пользователю — считается ботом.
- **Origin allowlist**: запросы принимаются только с `ALLOWED_ORIGINS`
  (см. `wrangler.toml`).

## Деплой

```bash
cd worker
npx wrangler deploy
```

⚠️ **Важно:** деплой кода через `wrangler deploy` может затереть секреты,
заданные через дашборд Cloudflare (замечено на практике с этим воркером).
После любого `wrangler deploy` проверяйте:

```bash
npx wrangler secret list
```

Если секретов нет — задайте их заново:

```bash
npx wrangler secret put TELEGRAM_BOT_TOKEN
npx wrangler secret put TELEGRAM_CHAT_ID
```

(или через дашборд: Workers & Pages → ddiia → Settings → Variables and
Secrets → Add variable → тип **Secret**).
