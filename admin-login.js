// Admin Login Script
const loginForm = document.getElementById('login-form');
const alertContainer = document.getElementById('alert-container');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Show loading state
    const submitButton = loginForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Logging in...';

    try {
        const response = await fetch('api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            showAlert('Login successful! Redirecting...', 'success');
            localStorage.setItem('admin_token', data.token);
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showAlert(data.message || 'Invalid credentials', 'error');
            submitButton.disabled = false;
            submitButton.textContent = 'Login';
        }
    } catch (error) {
        showAlert('Connection error. Please try again.', 'error');
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
    }
});

function showAlert(message, type) {
    alertContainer.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;

    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

// Check if already logged in
const token = localStorage.getItem('admin_token');
if (token) {
    // Verify token
    fetch('api/verify-token.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
    })
    .then(response => response.json())
    .then(data => {
        if (data.valid) {
            window.location.href = 'dashboard.html';
        }
    })
    .catch(error => {
        console.log('Token verification failed');
    });
}
