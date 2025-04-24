// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to topic items
    const topicItems = document.querySelectorAll('.topic-item');
    topicItems.forEach(item => {
        item.addEventListener('click', function() {
            // Get the topic name from the h3 element
            const topicName = this.querySelector('h3').textContent;
            
            // Navigate to practice page with the selected topic
            window.location.href = `practice.html?topic=${encodeURIComponent(topicName)}`;
        });
    });

    // Add hover effect to topic items
    topicItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', function() {
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

    // Add animation delay to topic items
    topicItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Create search container and input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search topics...';
    searchInput.className = 'search-input';

    // Add search icon
    const searchIcon = document.createElement('i');
    searchIcon.className = 'fas fa-search search-icon';
    searchInput.appendChild(searchIcon);

    // Add search container to the page
    searchContainer.appendChild(searchInput);
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(searchContainer, mainContent.firstChild);

    // Add search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        topicItems.forEach(item => {
            const topicTitle = item.querySelector('h3').textContent.toLowerCase();
            const topicItems = item.querySelectorAll('li');
            let hasMatch = topicTitle.includes(searchTerm);
            
            topicItems.forEach(li => {
                if (li.textContent.toLowerCase().includes(searchTerm)) {
                    hasMatch = true;
                }
            });
            
            item.style.display = hasMatch ? 'block' : 'none';
        });
    });
}); 