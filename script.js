document.addEventListener('DOMContentLoaded', function() {
    const authContainer = document.getElementById('auth-container');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');

    loginBtn.addEventListener('click', login);
    registerBtn.addEventListener('click', register);

    function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[username] && users[username].password === password) {
            localStorage.setItem('currentUser', username);
            window.location.href = 'avatar.html';
        } else {
            alert('Invalid username or password');
        }
    }

    function register() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[username]) {
            alert('Username already exists');
        } else {
            users[username] = { password, character: null };
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', username);
            alert('Registration successful. Redirecting to avatar creation.');
            window.location.href = 'avatar.html';
        }
    }
});
