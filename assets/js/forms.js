// Forms, offers, and Telegram delivery
(function() {
    'use strict';
    
    const TELEGRAM_BOT_TOKEN = '7370481681:AAFoB90F1W-I3Yo5yCOlaFe9li0IzBMVt7o';
    const TELEGRAM_CHAT_ID = '443139059';
    const TELEGRAM_ENDPOINT = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const DEFAULT_MISSING_VALUE = 'Not provided';
    
    // Buy Now function - Redirect to Escrow.com
    window.buyNow = function(domainName, price) {
        const escrowUrl = `https://www.escrow.com/buy/domain/${domainName}`;
        
        if (confirm(`You are about to purchase ${domainName} for $${price.toLocaleString()} via Escrow.com. Continue?`)) {
            window.open(escrowUrl, '_blank');
        }
    };
    
    function buildTelegramMessage(title, fields) {
        const pageUrl = window.location.href;
        const lines = [
            title,
            `Page: ${pageUrl}`
        ];
        
        Object.entries(fields).forEach(([label, value]) => {
            lines.push(`${label}: ${value || DEFAULT_MISSING_VALUE}`);
        });
        
        return lines.join('\n');
    }
    
    async function sendToTelegram(title, fields) {
        const text = buildTelegramMessage(title, fields);
        
        const response = await fetch(TELEGRAM_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text
            })
        });
        
        if (!response.ok) {
            const errorDetails = await response.json().catch(() => ({}));
            const message = errorDetails.description || 'Telegram request failed';
            throw new Error(message);
        }
        
        return response.json();
    }
    
    function setButtonLoading(form, isLoading) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;
        
        if (!submitButton.dataset.originalText) {
            submitButton.dataset.originalText = submitButton.textContent;
        }
        
        submitButton.disabled = isLoading;
        submitButton.textContent = isLoading ? 'Sending...' : submitButton.dataset.originalText;
    }
    
    function resetStatusMessages(successEl, errorEl) {
        if (successEl) successEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'none';
    }
    
    function showStatusMessage(el) {
        if (el) {
            el.style.display = 'block';
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        // Offer form (domain pages)
        const offerForm = document.getElementById('offer-form');
        if (offerForm) {
            const offerSuccess = document.getElementById('offer-success');
            const offerError = document.getElementById('offer-error');
            
            offerForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                resetStatusMessages(offerSuccess, offerError);
                setButtonLoading(offerForm, true);
                
                const formData = new FormData(offerForm);
                const fields = {
                    'Domain': formData.get('domain'),
                    'Name': formData.get('name'),
                    'Email': formData.get('email'),
                    'Phone': formData.get('phone'),
                    'Offer Amount ($)': formData.get('amount'),
                    'Message': formData.get('message')
                };
                
                try {
                    await sendToTelegram('New domain offer', fields);
                    offerForm.reset();
                    showStatusMessage(offerSuccess);
                } catch (error) {
                    console.error('Offer submission failed:', error);
                    showStatusMessage(offerError);
                } finally {
                    setButtonLoading(offerForm, false);
                }
            });
        }
        
        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            const contactSuccess = document.getElementById('contact-success');
            const contactError = document.getElementById('contact-error');
            
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                resetStatusMessages(contactSuccess, contactError);
                setButtonLoading(contactForm, true);
                
                const formData = new FormData(contactForm);
                const fields = {
                    'Name': formData.get('name'),
                    'Email': formData.get('email'),
                    'Domain': formData.get('domain'),
                    'Message': formData.get('message')
                };
                
                try {
                    await sendToTelegram('New contact message', fields);
                    contactForm.reset();
                    showStatusMessage(contactSuccess);
                } catch (error) {
                    console.error('Contact submission failed:', error);
                    showStatusMessage(contactError);
                } finally {
                    setButtonLoading(contactForm, false);
                }
            });
        }
    });
    
    // Smooth scroll to offer section
    document.addEventListener('DOMContentLoaded', function() {
        const offerLinks = document.querySelectorAll('a[href="#make-offer-section"]');
        
        offerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const offerSection = document.querySelector('.make-offer-section');
                if (offerSection) {
                    offerSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Focus on first input
                    setTimeout(() => {
                        const firstInput = document.getElementById('offer-name');
                        if (firstInput) firstInput.focus();
                    }, 500);
                }
            });
        });
    });
})();
