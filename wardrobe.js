// wardrobe.js

document.addEventListener('DOMContentLoaded', function() {
    const wardrobeList = document.getElementById('wardrobe-list');
    const avatarContainer = document.getElementById('avatar-container');
    const applyAvatarBtn = document.getElementById('apply-avatar-btn');
    const clearAvatarBtn = document.getElementById('clear-avatar-btn');
    let appliedItems = [];
    let stagedItems = []; // New variable to track items on the avatar but not yet applied
    let currentSkinTone = 'default';

    // Add this line to update the coin display when the page loads
    updateCoinDisplay();

    function displayInventory() {
        const currentUser = UserManager.getCurrentUser();
        const inventory = UserManager.getUserInventory(currentUser);
        wardrobeList.innerHTML = '';

        inventory.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'wardrobe-item';
            itemElement.dataset.itemId = item.id;
            itemElement.innerHTML = `
                <div class="item-preview">
                    <img src="${item.svg}" alt="${item.name}" class="item-image">
                </div>
                <p class="wardrobe-item-name">${item.name}</p>
            `;
            itemElement.addEventListener('click', () => toggleItem(item, itemElement));
            wardrobeList.appendChild(itemElement);

            const imgElement = itemElement.querySelector('.item-image');
            applyItemPosition(imgElement, item.type);
        });
    }

    function toggleItem(item, itemElement) {
        const index = stagedItems.findIndex(stagedItem => stagedItem.id === item.id);
        if (index === -1) {
            stagedItems.push(item);
        } else {
            stagedItems.splice(index, 1);
        }
        updateAvatarPreview();
    }

    function updateAvatarPreview() {
        const avatarSVG = avatarContainer.querySelector('svg');
        if (!avatarSVG) {
            console.error('Avatar SVG not found');
            return;
        }

        // Remove all existing item layers
        avatarSVG.querySelectorAll('g[id$="-layer"]').forEach(layer => layer.remove());

        // Add layers for staged items
        stagedItems.forEach(item => {
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

    function applyAvatar() {
        appliedItems = [...stagedItems]; // Copy staged items to applied items
        saveAvatarState();
        NotificationSystem.show('Avatar updated and saved!');
    }

    function applyItemPosition(itemElement, itemType) {
        const position = itemPositions[itemType] || itemPositions.default;
        itemElement.style.objectPosition = position.objectPosition;
        itemElement.style.transform = position.transform;
    }

    function clearAvatar() {
        appliedItems = [];
        stagedItems = [];
        currentSkinTone = 'default';
        updateAvatarPreview();
        
        if (typeof window.setSkinTone === 'function') {
            window.setSkinTone('default');
        }
        
        saveAvatarState();
        NotificationSystem.show('Avatar cleared!');
    }

    function loadAvatarState() {
        const currentUser = UserManager.getCurrentUser();
        const savedAvatarState = UserManager.getUserAvatarState(currentUser);
        if (savedAvatarState) {
            appliedItems = savedAvatarState.appliedItems || [];
            stagedItems = [...appliedItems]; // Initialize staged items with applied items
            currentSkinTone = savedAvatarState.skinTone || 'default';
            
            updateAvatarPreview();
            
            // Apply saved skin tone
            if (typeof window.setSkinTone === 'function') {
                window.setSkinTone(currentSkinTone);
            }
        }
    }

    function saveAvatarState() {
        const currentUser = UserManager.getCurrentUser();
        const avatarState = {
            appliedItems: appliedItems,
            skinTone: currentSkinTone
        };
        UserManager.setUserAvatarState(currentUser, avatarState);
    }

    // Initialize the wardrobe
    displayInventory();
    loadAvatarState();

    // Event listeners for apply and clear buttons
    applyAvatarBtn.addEventListener('click', applyAvatar);
    clearAvatarBtn.addEventListener('click', clearAvatar);

    // Initialize avatar if not already initialized
    if (!avatarContainer.querySelector('svg')) {
        window.initializeAvatar();
    }

    // Add event listener for skin tone changes
    document.addEventListener('skinToneChanged', function(e) {
        currentSkinTone = e.detail.tone;
        saveAvatarState();
    });
});


window.initializeAvatar = function() {
    const avatarContainer = document.getElementById('avatar-container');
    if (avatarContainer && !avatarContainer.querySelector('svg')) {
        avatarContainer.innerHTML = `
            <svg aria-label="user avatar" viewBox="-40.94377899169922 -146.29818725585938 68.82828521728516 163.4471893310547" preserveAspectRatio="xMidYMid meet">
                <!-- Your existing SVG content here -->
            </svg>
        `;
    }
};

function updateCoinDisplay() {
    const coinDisplay = document.getElementById('coin-amount');
    if (coinDisplay) {
        const currentUser = UserManager.getCurrentUser();
        const userCoins = UserManager.getUserCoins(currentUser);
        coinDisplay.textContent = userCoins;
    } else {
        console.error('Coin display element not found');
    }
}
