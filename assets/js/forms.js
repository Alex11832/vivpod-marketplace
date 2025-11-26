// Forms and Payment Integration
(function() {
    'use strict';
    
    // Buy Now function - Redirect to Escrow.com
    window.buyNow = function(domainName, price) {
        // Escrow.com integration
        // Format: https://www.escrow.com/buy/domain/{domain-name}
        const escrowUrl = `https://www.escrow.com/buy/domain/${domainName}`;
        
        // Optional: You can also use Escrow API to create a transaction
        // For now, we'll redirect to Escrow.com with the domain
        
        if (confirm(`You are about to purchase ${domainName} for $${price.toLocaleString()} via Escrow.com. Continue?`)) {
            window.open(escrowUrl, '_blank');
        }
    };
    
    // Make Offer Form Handler
    document.addEventListener('DOMContentLoaded', function() {
        const offerForm = document.getElementById('offer-form');
        
        if (offerForm) {
            offerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(offerForm);
                const data = {
                    domain: formData.get('domain'),
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    amount: formData.get('amount'),
                    message: formData.get('message')
                };
                
                // Hide previous messages
                document.getElementById('offer-success').style.display = 'none';
                document.getElementById('offer-error').style.display = 'none';
                
                // Submit to backend
                submitOffer(data);
            });
        }
    });
    
    // Submit offer to backend
    function submitOffer(data) {
        // Option 1: Use Formspree (free form backend)
        const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree ID
        
        // Option 2: Use your own backend
        // const backendEndpoint = 'https://your-backend.com/api/offers';
        
        // For demo purposes, we'll simulate a successful submission
        // In production, replace this with actual API call
        
        // Simulated API call
        setTimeout(function() {
            // Success
            document.getElementById('offer-success').style.display = 'block';
            document.getElementById('offer-form').reset();
            
            // Scroll to success message
            document.getElementById('offer-success').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Log offer data (in production, this would be sent to your backend)
            console.log('Offer submitted:', data);
            
            // Optional: Send to email via mailto as fallback
            // This creates a pre-filled email that user can send
            const emailSubject = `Domain Offer: ${data.domain}`;
            const emailBody = `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Offer Amount: $${data.amount}
Message: ${data.message || 'No additional message'}
Domain: ${data.domain}
            `.trim();
            
            // Uncomment to enable mailto fallback
            // window.location.href = `mailto:contact@vivpod.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
        }, 1000);
        
        /* 
        // Real implementation with Formspree:
        fetch(formspreeEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('offer-success').style.display = 'block';
                document.getElementById('offer-form').reset();
            } else {
                throw new Error('Submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('offer-error').style.display = 'block';
        });
        */
    }
    
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
