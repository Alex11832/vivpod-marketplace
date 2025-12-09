---
layout: default
title: Contact Us
permalink: /contact/
---

<section class="contact-hero">
    <div class="container">
        <p class="eyebrow">Contact</p>
        <h1>We're here to help</h1>
        <p class="lead">Questions about a domain, transfer, or payment? Reach out and we'll respond quickly.</p>
        <a class="btn btn-secondary contact-cta" href="mailto:{{ site.email }}">Email {{ site.email }}</a>

        <div class="contact-tiles">
            <div class="contact-tile">
                <div class="tile-icon">📧</div>
                <p class="label">Email</p>
                <p class="value"><a href="mailto:{{ site.email }}">{{ site.email }}</a></p>
            </div>
            <div class="contact-tile">
                <div class="tile-icon">⏱</div>
                <p class="label">Response time</p>
                <p class="value">Most inquiries answered within 24 hours</p>
            </div>
            <div class="contact-tile">
                <div class="tile-icon">📍</div>
                <p class="label">Hours</p>
                <p class="value">Monday–Friday, 9 AM–6 PM (EST)</p>
            </div>
        </div>
    </div>
</section>

<div class="page-content">
    <div class="container">
        <div class="contact-grid">
            <div class="contact-card" id="contact-form-card">
                <h2>Send a message</h2>
                <p class="contact-copy">Share the domain name and how we can help. We usually reply same business day.</p>
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
                        <label for="contact-domain">Domain Name</label>
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

            <div class="contact-card">
                <h2>Need help with a domain?</h2>
                <p>Tell us the domain name and what you need. We can help with buying, transfer steps, or offer questions.</p>
                <ul class="help-topics">
                    <li>Buying a domain through Escrow.com</li>
                    <li>Starting or completing a transfer at your registrar</li>
                    <li>Submitting or negotiating an offer</li>
                    <li>Payment options and timing</li>
                </ul>
            </div>
        </div>

        <div class="contact-faq">
            <h2>Quick answers</h2>
            <div class="faq-grid">
                <div class="faq-item">
                    <h3>How do I buy a domain?</h3>
                    <p>Click “Buy Now” on the domain page to complete checkout via our secure payment partner (e.g., Escrow.com). Once payment clears, we start the transfer.</p>
                </div>
                <div class="faq-item">
                    <h3>How long does transfer take?</h3>
                    <p>Most transfers finish within a few days after payment clears, depending on the registrar. We'll guide you on any steps you need to take.</p>
                </div>
                <div class="faq-item">
                    <h3>Can I make an offer?</h3>
                    <p>Yes. Use “Make an Offer” on the domain page. We may accept, counter, or decline at our discretion.</p>
                </div>
                <div class="faq-item">
                    <h3>Is my purchase protected?</h3>
                    <p>Transactions run through trusted providers like Escrow.com for secure, protected payment and transfer.</p>
                </div>
            </div>
        </div>
    </div>
</div>
