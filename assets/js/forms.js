// Forms, offers, and Telegram delivery
(function() {
    'use strict';
    
    const TELEGRAM_BOT_TOKEN = '7370481681:AAFoB90F1W-I3Yo5yCOlaFe9li0IzBMVt7o';
    const TELEGRAM_CHAT_ID = '443139059';
    const TELEGRAM_ENDPOINT = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const DEFAULT_MISSING_VALUE = 'Not provided';
    
    const checkoutState = {
        modal: null,
        form: null,
        success: null,
        error: null,
        domainDisplay: null,
        priceDisplay: null,
        hiddenDomain: null,
        hiddenPrice: null,
        currentDomain: null,
        currentPrice: null
    };
    
    function formatPrice(value) {
        const numeric = Number(value);
        if (Number.isFinite(numeric)) {
            return `$${numeric.toLocaleString()}`;
        }
        return value || DEFAULT_MISSING_VALUE;
    }
    
    function updateCheckoutValues(domainName, price) {
        checkoutState.currentDomain = domainName;
        checkoutState.currentPrice = price;
        const priceText = formatPrice(price);
        
        if (checkoutState.domainDisplay) checkoutState.domainDisplay.textContent = domainName || DEFAULT_MISSING_VALUE;
        if (checkoutState.priceDisplay) checkoutState.priceDisplay.textContent = priceText;
        if (checkoutState.hiddenDomain) checkoutState.hiddenDomain.value = domainName || '';
        if (checkoutState.hiddenPrice) checkoutState.hiddenPrice.value = price || '';
    }
    
    function toggleCheckoutModal(isOpen) {
        if (!checkoutState.modal) return;
        
        checkoutState.modal.classList.toggle('is-active', isOpen);
        checkoutState.modal.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        document.body.classList.toggle('modal-open', isOpen);
    }
    
    function openCheckoutModal(domainName, price) {
        if (!checkoutState.form) return;
        
        resetStatusMessages(checkoutState.success, checkoutState.error);
        checkoutState.form.reset();
        updateCheckoutValues(domainName, price);
        toggleCheckoutModal(true);
        
        const emailInput = checkoutState.form.querySelector('#checkout-email');
        if (emailInput) emailInput.focus();
    }
    
    function closeCheckoutModal() {
        toggleCheckoutModal(false);
    }
    
    // Buy Now: open secure checkout form
    window.buyNow = function(domainName, price) {
        openCheckoutModal(domainName, price);
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
        // Secure checkout form
        checkoutState.modal = document.getElementById('checkout-modal');
        checkoutState.form = document.getElementById('checkout-form');
        checkoutState.success = document.getElementById('checkout-success');
        checkoutState.error = document.getElementById('checkout-error');
        checkoutState.domainDisplay = document.getElementById('checkout-domain');
        checkoutState.priceDisplay = document.getElementById('checkout-price');
        
        if (checkoutState.form) {
            checkoutState.hiddenDomain = checkoutState.form.querySelector('input[name="domain"]');
            checkoutState.hiddenPrice = checkoutState.form.querySelector('input[name="price"]');
        }
        
        if (checkoutState.modal) {
            const closeTriggers = checkoutState.modal.querySelectorAll('[data-close="checkout"]');
            closeTriggers.forEach(el => {
                el.addEventListener('click', closeCheckoutModal);
            });
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && checkoutState.modal.classList.contains('is-active')) {
                    closeCheckoutModal();
                }
            });
        }
        
        if (checkoutState.form) {
            updateCheckoutValues(
                checkoutState.hiddenDomain ? checkoutState.hiddenDomain.value : DEFAULT_MISSING_VALUE,
                checkoutState.hiddenPrice ? checkoutState.hiddenPrice.value : DEFAULT_MISSING_VALUE
            );
            
            checkoutState.form.addEventListener('submit', async function(e) {
                e.preventDefault();
                resetStatusMessages(checkoutState.success, checkoutState.error);
                
                if (!checkoutState.form.reportValidity()) {
                    return;
                }
                
                setButtonLoading(checkoutState.form, true);
                
                const formData = new FormData(checkoutState.form);
                const domainName = formData.get('domain');
                const priceValue = formData.get('price');
                
                const fields = {
                    'Domain': domainName,
                    'Price': formatPrice(priceValue),
                    'Email': formData.get('email'),
                    'Full name': formData.get('full_name'),
                    'Phone': formData.get('phone'),
                    'Escrow confirmation': formData.get('escrow_confirm') ? 'Confirmed' : 'Not confirmed'
                };
                
                try {
                    await sendToTelegram('New secure checkout request', fields);
                    checkoutState.form.reset();
                    updateCheckoutValues(domainName, priceValue);
                    showStatusMessage(checkoutState.success);
                } catch (error) {
                    console.error('Checkout submission failed:', error);
                    showStatusMessage(checkoutState.error);
                } finally {
                    setButtonLoading(checkoutState.form, false);
                }
            });
        }
        
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
