---
layout: default
title: Contact Us
---

<div class="page-content">
    <div class="container">
        <div class="page-header">
            <h1>Contact Us</h1>
            <p class="lead">Have questions? We're here to help!</p>
        </div>
        
        <div class="contact-content">
            <div class="contact-info-section">
                <h2>Get in Touch</h2>
                <p>Whether you have questions about a specific domain, need assistance with a purchase, or want to discuss a custom offer, our team is ready to assist you.</p>
                
                <div class="contact-methods">
                    <div class="contact-method">
                        <div class="contact-icon">📧</div>
                        <h3>Email</h3>
                        <p><a href="mailto:{{ site.email }}">{{ site.email }}</a></p>
                    </div>
                    
                    <div class="contact-method">
                        <div class="contact-icon">💬</div>
                        <h3>Response Time</h3>
                        <p>We typically respond within 24 hours</p>
                    </div>
                    
                    <div class="contact-method">
                        <div class="contact-icon">🌍</div>
                        <h3>Availability</h3>
                        <p>Monday - Friday, 9 AM - 6 PM EST</p>
                    </div>
                </div>
            </div>
            
            <div class="contact-form-section">
                <h2>Send Us a Message</h2>
                
                <form id="contact-form" class="contact-form">
                    <div class="form-group">
                        <label for="contact-name">Your Name *</label>
                        <input type="text" id="contact-name" name="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="contact-email">Email Address *</label>
                        <input type="email" id="contact-email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="contact-subject">Subject *</label>
                        <select id="contact-subject" name="subject" required>
                            <option value="">Select a subject...</option>
                            <option value="domain-inquiry">Domain Inquiry</option>
                            <option value="purchase-help">Purchase Assistance</option>
                            <option value="transfer-support">Transfer Support</option>
                            <option value="make-offer">Make an Offer</option>
                            <option value="general">General Question</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="contact-domain">Domain Name (if applicable)</label>
                        <input type="text" id="contact-domain" name="domain" placeholder="e.g., example.com">
                    </div>
                    
                    <div class="form-group">
                        <label for="contact-message">Message *</label>
                        <textarea id="contact-message" name="message" rows="6" required></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-large">Send Message</button>
                </form>
                
                <div id="contact-success" class="alert alert-success" style="display: none;">
                    Thank you for your message! We'll get back to you soon.
                </div>
                <div id="contact-error" class="alert alert-error" style="display: none;">
                    Sorry, there was an error sending your message. Please try emailing us directly.
                </div>
            </div>
        </div>
        
        <div class="faq-section">
            <h2>Frequently Asked Questions</h2>
            
            <div class="faq-grid">
                <div class="faq-item">
                    <h3>How long does the domain transfer take?</h3>
                    <p>Most domain transfers are completed within 24-48 hours after payment is confirmed through Escrow.com.</p>
                </div>
                
                <div class="faq-item">
                    <h3>Is my purchase protected?</h3>
                    <p>Yes! All transactions are processed through Escrow.com, providing maximum security for both buyers and sellers.</p>
                </div>
                
                <div class="faq-item">
                    <h3>Can I negotiate the price?</h3>
                    <p>Absolutely! You can submit an offer on any domain page, and we'll review it and get back to you promptly.</p>
                </div>
                
                <div class="faq-item">
                    <h3>What if I'm not satisfied?</h3>
                    <p>We offer a 30-day money-back guarantee on all domain purchases. Your satisfaction is our priority.</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.contact-content {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 60px;
    margin-bottom: 80px;
}

.contact-info-section h2,
.contact-form-section h2 {
    font-size: 28px;
    margin-bottom: 20px;
    color: var(--text-color);
}

.contact-info-section p {
    font-size: 18px;
    line-height: 1.8;
    color: #555;
    margin-bottom: 30px;
}

.contact-methods {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.contact-method {
    background: var(--light-gray);
    padding: 25px;
    border-radius: 8px;
}

.contact-icon {
    font-size: 36px;
    margin-bottom: 10px;
}

.contact-method h3 {
    font-size: 18px;
    margin-bottom: 8px;
    color: var(--text-color);
}

.contact-method p {
    font-size: 16px;
    color: #666;
    margin: 0;
}

.contact-method a {
    color: var(--primary-color);
    text-decoration: none;
}

.contact-method a:hover {
    text-decoration: underline;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.contact-form select {
    padding: 12px 15px;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 16px;
    font-family: inherit;
    background-color: var(--white);
    cursor: pointer;
}

.contact-form select:focus {
    outline: none;
    border-color: var(--primary-color);
}

.faq-section {
    background: var(--light-gray);
    padding: 60px;
    border-radius: 12px;
}

.faq-section h2 {
    font-size: 32px;
    margin-bottom: 40px;
    text-align: center;
    color: var(--text-color);
}

.faq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.faq-item {
    background: var(--white);
    padding: 25px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
}

.faq-item h3 {
    font-size: 18px;
    margin-bottom: 12px;
    color: var(--primary-color);
}

.faq-item p {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    margin: 0;
}

@media (max-width: 968px) {
    .contact-content {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    
    .faq-section {
        padding: 40px 20px;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                domain: formData.get('domain'),
                message: formData.get('message')
            };
            
            // Hide previous messages
            document.getElementById('contact-success').style.display = 'none';
            document.getElementById('contact-error').style.display = 'none';
            
            // Simulate submission (replace with actual API call)
            setTimeout(function() {
                document.getElementById('contact-success').style.display = 'block';
                contactForm.reset();
                
                document.getElementById('contact-success').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                console.log('Contact form submitted:', data);
            }, 1000);
        });
    }
});
</script>
