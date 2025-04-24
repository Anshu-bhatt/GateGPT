// Form validation function
function validateForm() {
    let isValid = true;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Reset error messages
    document.querySelectorAll('.error-message').forEach(elem => elem.textContent = '');

    // Validate Full Name
    if (fullName.length < 2) {
        document.getElementById('fullNameError').textContent = 'Name must be at least 2 characters long';
        isValid = false;
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Validate Password
    if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
        isValid = false;
    }

    // Validate Confirm Password
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }

    return isValid;
}

// Handle form submission
function handleRegistration(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return false;
    }

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    // Store user data in localStorage (simulating backend storage)
    try {
        // Get existing users or initialize empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        if (users.some(user => user.email === formData.email)) {
            document.getElementById('emailError').textContent = 'Email already registered';
            return false;
        }

        // Add new user
        users.push(formData);
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message
        alert('Account created successfully! Redirecting to login page...');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

        return false;
    } catch (error) {
        alert('An error occurred during registration. Please try again.');
        return false;
    }
}

// Add real-time validation event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Full Name validation
    document.getElementById('fullName').addEventListener('input', function() {
        if (this.value.length < 2) {
            document.getElementById('fullNameError').textContent = 'Name must be at least 2 characters long';
        } else {
            document.getElementById('fullNameError').textContent = '';
        }
    });

    // Email validation
    document.getElementById('email').addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
        } else {
            document.getElementById('emailError').textContent = '';
        }
    });

    // Password validation
    document.getElementById('password').addEventListener('input', function() {
        if (this.value.length < 8) {
            document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long';
        } else {
            document.getElementById('passwordError').textContent = '';
        }
    });

    // Confirm Password validation
    document.getElementById('confirmPassword').addEventListener('input', function() {
        const password = document.getElementById('password').value;
        if (this.value !== password) {
            document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        } else {
            document.getElementById('confirmPasswordError').textContent = '';
        }
    });
});
  