// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animation delay to resource cards
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effect to resource cards
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add external link indicators
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        const icon = document.createElement('i');
        icon.className = 'fas fa-external-link-alt';
        icon.style.marginLeft = '0.5rem';
        icon.style.fontSize = '0.8rem';
        link.appendChild(icon);
    });

    // Add search functionality
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search resources...';
    searchInput.className = 'search-input';

    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search search-icon';
    searchInput.appendChild(searchIcon);

    searchContainer.appendChild(searchInput);
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(searchContainer, mainContent.firstChild);

    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        resourceCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardLinks = card.querySelectorAll('a');
            let hasMatch = cardTitle.includes(searchTerm);
            
            cardLinks.forEach(link => {
                if (link.textContent.toLowerCase().includes(searchTerm)) {
                    hasMatch = true;
                }
            });
            
            card.style.display = hasMatch ? 'block' : 'none';
        });
    });
}); 