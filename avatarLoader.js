// avatarLoader.js

const AvatarLoader = {
    cachedItems: {},

    init: function() {
        this.avatarContainer = document.getElementById('avatar-container');
        this.currentUser = localStorage.getItem('currentUser');

        if (!this.currentUser) {
            console.error('User is not logged in.');
            return;
        }

        this.initializeAvatar();
        this.loadAvatarState();
    },

    initializeAvatar: function() {
        if (this.avatarContainer && !this.avatarContainer.querySelector('svg')) {
            this.avatarContainer.innerHTML = `
                <svg aria-label="user avatar" viewBox="-40.94377899169922 -146.29818725585938 68.82828521728516 163.4471893310547" preserveAspectRatio="xMidYMid meet">
                    <!-- SVG content will be added here -->
                </svg>
            `;
        }
    },

    loadAvatarState: function() {
        const avatarSVG = this.avatarContainer.querySelector('svg');
        
        if (!avatarSVG) {
            console.error('Avatar SVG not found');
            return;
        }

        // Load body template
        if (typeof bodyTemplate !== 'undefined') {
            const bodyLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            bodyLayer.id = 'body-layer';
            bodyLayer.innerHTML = bodyTemplate;
            avatarSVG.appendChild(bodyLayer);
        } else {
            console.error('Body template not found. Make sure body.js is loaded.');
        }

        // Load applied items
        const savedAvatarState = UserManager.getUserAvatarState(this.currentUser);
        
        if (savedAvatarState && savedAvatarState.appliedItems) {
            const promises = savedAvatarState.appliedItems.map(item => this.loadItem(item, avatarSVG));
            Promise.all(promises).then(() => {
                // Apply saved skin tone
                if (typeof window.setSkinTone === 'function' && savedAvatarState.skinTone) {
                    window.setSkinTone(savedAvatarState.skinTone);
                }
                // Dispatch event to update avatar icon
                document.dispatchEvent(new Event('avatarUpdated'));
            });
        }
    },

    loadItem: function(item, avatarSVG) {
        return new Promise((resolve, reject) => {
            const existingLayer = avatarSVG.querySelector(`#${item.type}-layer`);
            if (existingLayer) {
                avatarSVG.removeChild(existingLayer);
            }

            const itemLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
            itemLayer.id = `${item.type}-layer`;
            avatarSVG.appendChild(itemLayer);

            if (this.cachedItems[item.svg]) {
                itemLayer.innerHTML = this.cachedItems[item.svg];
                itemLayer.setAttribute('transform', 'translate(0, 0) scale(1)');
                resolve();
            } else {
                fetch(item.svg)
                    .then(response => response.text())
                    .then(svgContent => {
                        const svgInnerContent = svgContent.replace(/<\/?svg[^>]*>/g, '');
                        this.cachedItems[item.svg] = svgInnerContent;
                        itemLayer.innerHTML = svgInnerContent;
                        itemLayer.setAttribute('transform', 'translate(0, 0) scale(1)');
                        resolve();
                    })
                    .catch(error => {
                        console.error('Error loading SVG:', error);
                        reject(error);
                    });
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    AvatarLoader.init();
});
