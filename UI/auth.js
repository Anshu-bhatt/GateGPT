// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}

// Add logout button to navigation
function addLogoutButton() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        const logoutItem = document.createElement('li');
        logoutItem.className = 'nav-item';
        logoutItem.innerHTML = `
            <a href="#" class="nav-link" onclick="logout()">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        `;
        navMenu.appendChild(logoutItem);
    }
}

// Initialize auth check and logout button
document.addEventListener('DOMContentLoaded', function() {
    // Skip auth check on login and registration pages
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'login.html' && currentPage !== 'registration_page.html') {
        checkAuth();
        addLogoutButton();
    }
}); 