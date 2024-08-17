document.addEventListener('DOMContentLoaded', function() {
    const avatarContainer = document.getElementById('avatar-container');
    const wardrobeBtn = document.getElementById('wardrobe-btn');
    const wardrobeOptions = document.getElementById('wardrobe-options');
    const itemOptions = document.getElementById('item-options');
    const skinToneButtons = document.querySelectorAll('.skin-tone-btn');

    // Wardrobe functionality
    wardrobeBtn.addEventListener('click', toggleWardrobeOptions);

    function toggleWardrobeOptions() {
        wardrobeOptions.style.display = wardrobeOptions.style.display === 'none' ? 'block' : 'none';
    }

    // Wardrobe item functionality
    const items = ['eye', 'hat', 'shirt', 'pants'];
    items.forEach(item => {
        const button = document.getElementById(`${item}-btn`);
        if (button) {
            button.addEventListener('click', () => showItemOptions(item));
        }
    });

    function showItemOptions(itemType) {
        itemOptions.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
            const button = document.createElement('button');
            button.textContent = `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} ${i}`;
            button.addEventListener('click', () => addItemToAvatar(itemType, i));
            itemOptions.appendChild(button);
        }
        itemOptions.style.display = 'block';
    }

    function addItemToAvatar(itemType, itemNumber) {
        console.log(`Adding ${itemType} ${itemNumber} to avatar`);
        // Implementation for adding items will go here
        // This should be integrated with the wardrobe.js functionality
    }

    // Skin tone functionality
    skinToneButtons.forEach(button => {
        button.addEventListener('click', function() {
            const skinTone = this.getAttribute('data-skin-tone');
            changeSkinTone(skinTone);
        });
    });

    function changeSkinTone(tone) {
        // This function should be implemented in wardrobe.js
        // Here we're just calling it, assuming it's available globally
        if (typeof window.changeSkinTone === 'function') {
            window.changeSkinTone(tone);
        } else {
            console.error('changeSkinTone function not found');
        }
    }

    // Initialize avatar
    window.initializeAvatar();
});
