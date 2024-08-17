// logged.js

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const errorMessage = document.getElementById('error-message');
    const usernameInput = document.getElementById('username');
    const loggedInUsername = document.getElementById('logged-in-username');

    if (loginBtn) loginBtn.addEventListener('click', login);
    if (registerBtn) registerBtn.addEventListener('click', register);
    if (usernameInput) usernameInput.addEventListener('input', checkUsername);

    function login() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (UserManager.loginUser(username, password)) {
            updateLoggedInUser(username);
            window.location.href = 'avatar.html';
        } else {
            displayError('Invalid username or password');
        }
    }

    function register() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        console.log('Attempting to register user:', username); // Debug log
        
        if (UserManager.registerUser(username, password)) {
            UserManager.loginUser(username, password);
            updateLoggedInUser(username);
            alert('Registration successful. You have been awarded 1000 coins. Redirecting to avatar creation.');
            window.location.href = 'avatar.html';
        } else {
            displayError('Username already taken. Please choose a different username.');
        }
    }

    function checkUsername() {
        const username = usernameInput.value;
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            displayError('Username already taken');
        } else {
            clearError();
        }
    }

    function displayError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function clearError() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }

    function updateLoggedInUser(username) {
        if (loggedInUsername) {
            loggedInUsername.textContent = username;
        }
    }

    // Clear error message when user starts typing
    document.getElementById('username').addEventListener('input', clearError);
    document.getElementById('password').addEventListener('input', clearError);

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        updateLoggedInUser(currentUser);
    }

    // Add a function to handle item purchase
    window.purchaseItem = function(item) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const userCoins = UserManager.getUserCoins(currentUser);
            if (userCoins >= item.price) {
                UserManager.setUserCoins(currentUser, userCoins - item.price);
                InventoryManager.addItemToInventory(item);
                updateCoinDisplay(userCoins, userCoins - item.price);
                alert(`You have successfully purchased ${item.name}!`);
            } else {
                alert("Not enough coins to purchase this item!");
            }
        } else {
            alert("Please log in to purchase items.");
        }
    };
});
