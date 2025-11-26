// Domain Search Functionality
(function() {
    'use strict';
    
    // Search function
    function searchDomains(query) {
        const searchTerm = query.toLowerCase().trim();
        const domainCards = document.querySelectorAll('.domain-card');
        const noResults = document.getElementById('no-results');
        let visibleCount = 0;
        
        if (!searchTerm) {
            // Show all domains if search is empty
            domainCards.forEach(card => {
                card.style.display = 'block';
            });
            if (noResults) noResults.style.display = 'none';
            return;
        }
        
        domainCards.forEach(card => {
            const domainName = card.getAttribute('data-name').toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();
            const description = card.querySelector('.domain-description').textContent.toLowerCase();
            
            // Search in name, category, and description
            if (domainName.includes(searchTerm) || 
                category.includes(searchTerm) || 
                description.includes(searchTerm)) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }
    
    // Initialize search when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Hero search
        const heroSearchInput = document.getElementById('domain-search');
        const heroSearchBtn = document.getElementById('search-btn');
        
        if (heroSearchBtn && heroSearchInput) {
            heroSearchBtn.addEventListener('click', function() {
                searchDomains(heroSearchInput.value);
            });
            
            heroSearchInput.addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    searchDomains(heroSearchInput.value);
                }
            });
            
            // Real-time search as user types
            heroSearchInput.addEventListener('input', function() {
                searchDomains(heroSearchInput.value);
            });
        }
        
        // Header search
        const headerSearchInput = document.getElementById('header-search-input');
        const headerSearchBtn = document.getElementById('header-search-btn');
        
        if (headerSearchBtn && headerSearchInput) {
            headerSearchBtn.addEventListener('click', function() {
                searchDomains(headerSearchInput.value);
                // Scroll to domains section
                const domainsSection = document.querySelector('.domains-section');
                if (domainsSection) {
                    domainsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            headerSearchInput.addEventListener('keyup', function(e) {
                if (e.key === 'Enter') {
                    searchDomains(headerSearchInput.value);
                    const domainsSection = document.querySelector('.domains-section');
                    if (domainsSection) {
                        domainsSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        }
        
        // Sync search inputs
        if (heroSearchInput && headerSearchInput) {
            heroSearchInput.addEventListener('input', function() {
                headerSearchInput.value = heroSearchInput.value;
            });
            
            headerSearchInput.addEventListener('input', function() {
                heroSearchInput.value = headerSearchInput.value;
            });
        }
    });
})();
