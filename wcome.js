// wcome.js

document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.getElementById('welcome-message');
    const avatarContainer = document.getElementById('avatar-container');
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
        // Display welcome message
        welcomeMessage.textContent = `Welcome, ${currentUser}!`;
        
        // Load user's avatar
        loadUserAvatar(currentUser);
    } else {
        // If no user is logged in, redirect to the login page
        window.location.href = 'index.html';
    }

    function loadUserAvatar(username) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username] && users[username].avatarState) {
            // Get the saved avatar state
            const avatarState = users[username].avatarState;
            
            // Initialize the avatar container if it's empty
            if (!avatarContainer.querySelector('svg')) {
                avatarContainer.innerHTML = `
                    <svg aria-label="user avatar" viewBox="-40.94377899169922 -146.29818725585938 68.82828521728516 163.4471893310547" preserveAspectRatio="xMidYMid meet">
                        <!-- SVG content will be added here -->
                    </svg>
                `;
            }

            const avatarSVG = avatarContainer.querySelector('svg');

            // Load body template
            if (typeof bodyTemplate !== 'undefined') {
                const bodyLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
                bodyLayer.id = 'body-layer';
                bodyLayer.innerHTML = bodyTemplate;
                avatarSVG.appendChild(bodyLayer);
            }

            // Load applied items
            if (avatarState.appliedItems) {
                avatarState.appliedItems.forEach(item => {
                    const itemLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
                    itemLayer.id = `${item.type}-layer`;
                    avatarSVG.appendChild(itemLayer);

                    fetch(item.svg)
                        .then(response => response.text())
                        .then(svgContent => {
                            const svgInnerContent = svgContent.replace(/<\/?svg[^>]*>/g, '');
                            itemLayer.innerHTML = svgInnerContent;
                            itemLayer.setAttribute('transform', 'translate(0, 0) scale(1)');
                        })
                        .catch(error => console.error('Error loading SVG:', error));
                });
            }

            // Apply skin tone
            if (typeof window.setSkinTone === 'function' && avatarState.skinTone) {
                window.setSkinTone(avatarState.skinTone);
            }
        } else {
            // Set default avatar if none exists
            avatarContainer.innerHTML = '<div class="avatar">Default Avatar</div>';
        }
    }
});
