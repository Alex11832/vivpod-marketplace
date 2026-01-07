// Main JavaScript functionality
(function() {
    'use strict';
    
    // Smooth scrolling for anchor links
    document.addEventListener('DOMContentLoaded', function() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe domain cards
        const cards = document.querySelectorAll('.domain-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            // Speed up fade-in animation (3× faster)
            card.style.transition = `opacity 0.15s ease ${index * 0.033}s, transform 0.15s ease ${index * 0.033}s`;
            observer.observe(card);
        });
    });
})();
