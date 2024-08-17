// logout.js

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear the current user from local storage
            localStorage.removeItem('currentUser');

            // Clear any other user-specific data you might have stored
            // For example, if you're storing the avatar state separately:
            // localStorage.removeItem('avatarState');

            // You can also clear all data if needed (be cautious with this):
            // localStorage.clear();

            // Optionally, you can show a logout message
            alert('You have been logged out successfully.');

            // Redirect to index.html
            window.location.href = 'index.html';
        });
    } else {
        console.error('Logout button not found');
    }
});

// Optional: Prevent accessing the page if not logged in
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        // If there's no logged-in user, redirect to the login page
        window.location.href = 'index.html';
    }
}

// Call this function when the page loads
checkLoginStatus();
