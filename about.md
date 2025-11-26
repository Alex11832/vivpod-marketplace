---
layout: default
title: About Us
---

<div class="page-content">
    <div class="container">
        <div class="page-header">
            <h1>About VivPod Domains</h1>
            <p class="lead">Your trusted partner in premium domain acquisition</p>
        </div>
        
        <div class="content-section">
            <h2>Who We Are</h2>
            <p>VivPod Domains is a premium domain marketplace specializing in high-quality, memorable domain names for businesses and entrepreneurs. We understand that your domain name is more than just a web address—it's your digital identity, your brand's first impression, and a crucial asset for your online success.</p>
        </div>
        
        <div class="content-section">
            <h2>Our Mission</h2>
            <p>We're committed to helping businesses find the perfect domain name that aligns with their brand vision and business goals. Our carefully curated portfolio features premium domains across various industries, from technology and healthcare to finance and education.</p>
        </div>
        
        <div class="content-section">
            <h2>Why Choose Us</h2>
            
            <div class="features-list">
                <div class="feature-box">
                    <h3>🔒 Secure Transactions</h3>
                    <p>All purchases are processed through Escrow.com, ensuring safe and secure transactions for both buyers and sellers.</p>
                </div>
                
                <div class="feature-box">
                    <h3>✓ 30-Day Guarantee</h3>
                    <p>We stand behind every domain we sell with a 30-day money-back guarantee. Your satisfaction is our priority.</p>
                </div>
                
                <div class="feature-box">
                    <h3>🚀 Fast Transfer</h3>
                    <p>Quick and efficient domain transfer process. Most domains are transferred within 24-48 hours of purchase completion.</p>
                </div>
                
                <div class="feature-box">
                    <h3>💬 Expert Support</h3>
                    <p>Our team is here to help you through every step of the process, from selection to transfer completion.</p>
                </div>
            </div>
        </div>
        
        <div class="content-section">
            <h2>How It Works</h2>
            
            <div class="steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <h3>Browse & Search</h3>
                    <p>Explore our collection of premium domains or use our search to find the perfect match.</p>
                </div>
                
                <div class="step">
                    <div class="step-number">2</div>
                    <h3>Make a Purchase or Offer</h3>
                    <p>Buy instantly at the listed price or submit an offer if you'd like to negotiate.</p>
                </div>
                
                <div class="step">
                    <div class="step-number">3</div>
                    <h3>Secure Transaction</h3>
                    <p>Complete your purchase through Escrow.com for maximum security and protection.</p>
                </div>
                
                <div class="step">
                    <div class="step-number">4</div>
                    <h3>Domain Transfer</h3>
                    <p>We'll handle the transfer process and ensure you receive full ownership of your domain.</p>
                </div>
            </div>
        </div>
        
        <div class="cta-box">
            <h2>Ready to Find Your Perfect Domain?</h2>
            <p>Browse our collection or contact us for personalized assistance.</p>
            <div class="cta-buttons">
                <a href="{{ '/' | relative_url }}" class="btn btn-primary">Browse Domains</a>
                <a href="{{ '/contact' | relative_url }}" class="btn btn-secondary">Contact Us</a>
            </div>
        </div>
    </div>
</div>

<style>
.page-content {
    padding: 60px 0;
}

.page-header {
    text-align: center;
    margin-bottom: 60px;
}

.page-header h1 {
    font-size: 48px;
    margin-bottom: 15px;
    color: var(--primary-color);
}

.lead {
    font-size: 24px;
    color: #666;
}

.content-section {
    margin-bottom: 50px;
}

.content-section h2 {
    font-size: 32px;
    margin-bottom: 20px;
    color: var(--text-color);
}

.content-section p {
    font-size: 18px;
    line-height: 1.8;
    color: #555;
    margin-bottom: 20px;
}

.features-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 30px;
}

.feature-box {
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 30px;
    transition: transform 0.3s, box-shadow 0.3s;
}

.feature-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.feature-box h3 {
    font-size: 20px;
    margin-bottom: 15px;
    color: var(--text-color);
}

.feature-box p {
    font-size: 16px;
    color: #666;
    margin: 0;
}

.steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    margin-top: 30px;
}

.step {
    text-align: center;
}

.step-number {
    width: 60px;
    height: 60px;
    background: var(--primary-color);
    color: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 700;
    margin: 0 auto 20px;
}

.step h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: var(--text-color);
}

.step p {
    font-size: 16px;
    color: #666;
}

.cta-box {
    background: linear-gradient(135deg, var(--primary-color) 0%, #5578c4 100%);
    color: var(--white);
    padding: 60px;
    border-radius: 12px;
    text-align: center;
    margin-top: 60px;
}

.cta-box h2 {
    font-size: 36px;
    margin-bottom: 15px;
}

.cta-box p {
    font-size: 20px;
    margin-bottom: 30px;
    opacity: 0.95;
}

.cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

@media (max-width: 768px) {
    .page-header h1 {
        font-size: 36px;
    }
    
    .steps {
        grid-template-columns: 1fr;
    }
    
    .cta-box {
        padding: 40px 20px;
    }
}
</style>
