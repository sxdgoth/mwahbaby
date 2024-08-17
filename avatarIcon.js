// avatarIcon.js

const AvatarIcon = {
    init: function() {
        this.createIconContainer();
        this.updateIcon();
    },

    createIconContainer: function() {
        const iconContainer = document.createElement('div');
        iconContainer.id = 'avatar-icon-container';
        iconContainer.style.position = 'fixed';
        iconContainer.style.top = '10px';
        iconContainer.style.left = '10px';
        iconContainer.style.width = '50px';
        iconContainer.style.height = '50px';
        iconContainer.style.overflow = 'hidden';
        iconContainer.style.borderRadius = '50%';
        document.body.appendChild(iconContainer);
    },

    updateIcon: function() {
        const mainAvatar = document.querySelector('#avatar-container svg');
        const iconContainer = document.getElementById('avatar-icon-container');

        if (mainAvatar && iconContainer) {
            const clonedAvatar = mainAvatar.cloneNode(true);
            
            // Ensure all elements are visible in the icon
            clonedAvatar.querySelectorAll('*').forEach(el => {
                el.removeAttribute('visibility');
                el.style.visibility = 'visible';
            });

            iconContainer.innerHTML = '';
            iconContainer.appendChild(clonedAvatar);

            // Zoom in on the head
            clonedAvatar.setAttribute('viewBox', '-30 -140 60 60');
            clonedAvatar.style.width = '100%';
            clonedAvatar.style.height = '100%';
        }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    AvatarIcon.init();
});

// Update icon when avatar is updated
document.addEventListener('avatarUpdated', function() {
    AvatarIcon.updateIcon();
});

// Also update icon periodically to catch any changes
setInterval(AvatarIcon.updateIcon, 1000);
