// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const togglePassword = document.querySelector('.toggle-password');

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Add input validation styles
    emailInput.addEventListener('input', function() {
        validateEmail(this);
    });

    passwordInput.addEventListener('input', function() {
        validatePassword(this);
    });
});

// Validate email format
function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);
    
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
    
    return isValid;
}

// Validate password
function validatePassword(input) {
    const password = input.value;
    const isValid = password.length >= 6;
    
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
    }
    
    return isValid;
}

// Main form validation function
function validateForm(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    
    // Reset error message
    errorMessage.textContent = '';
    
    // Validate email
    if (!validateEmail(emailInput)) {
        errorMessage.textContent = 'Please enter a valid email address';
        return false;
    }
    
    // Validate password
    if (!validatePassword(passwordInput)) {
        errorMessage.textContent = 'Password must be at least 6 characters long';
        return false;
    }
    
    // Simulate login process
    const email = emailInput.value;
    const password = passwordInput.value;
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Valid credentials
        const validEmail = 'gategpt@gmail.com';
        const validPassword = 'gategpt123';
        
        if (email === validEmail && password === validPassword) {
            // Store login state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Redirect to content page
            window.location.href = 'content.html';
        } else {
            // Show error message
            errorMessage.textContent = 'Invalid email or password';
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Add shake animation to form
            const loginContainer = document.querySelector('.login-container');
            loginContainer.classList.add('shake');
            setTimeout(() => {
                loginContainer.classList.remove('shake');
            }, 500);
        }
    }, 1000);
    
    return false;
}

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        window.location.href = 'content.html';
    }
});
