// welcome.js

document.addEventListener('DOMContentLoaded', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    window.location.href = 'index.html';
    return;
  }

  // Display welcome message
  const welcomeMessage = document.getElementById('welcome-message');
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${currentUser.username}!`;
  }
});
