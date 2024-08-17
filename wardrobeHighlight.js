// wardrobeHighlight.js

const WardrobeHighlight = {
    init: function() {
        this.wardrobeList = document.getElementById('wardrobe-list');
        this.loadHighlightedItems();
        this.addEventListeners();
    },

    addEventListeners: function() {
        this.wardrobeList.addEventListener('click', (event) => {
            const itemElement = event.target.closest('.wardrobe-item');
            if (itemElement) {
                this.toggleHighlight(itemElement);
            }
        });

        document.getElementById('apply-avatar-btn').addEventListener('click', () => {
            this.saveHighlightedItems();
        });

        document.getElementById('clear-avatar-btn').addEventListener('click', () => {
            this.clearAllHighlights();
        });
    },

    toggleHighlight: function(itemElement) {
        itemElement.classList.toggle('selected');
    },

    saveHighlightedItems: function() {
        const highlightedItems = Array.from(this.wardrobeList.querySelectorAll('.wardrobe-item.selected'))
            .map(item => item.dataset.itemId);
        localStorage.setItem('highlightedItems', JSON.stringify(highlightedItems));
    },

    loadHighlightedItems: function() {
        const highlightedItems = JSON.parse(localStorage.getItem('highlightedItems')) || [];
        highlightedItems.forEach(itemId => {
            const itemElement = this.wardrobeList.querySelector(`.wardrobe-item[data-item-id="${itemId}"]`);
            if (itemElement) {
                itemElement.classList.add('selected');
            }
        });
    },

    clearAllHighlights: function() {
        this.wardrobeList.querySelectorAll('.wardrobe-item.selected').forEach(item => {
            item.classList.remove('selected');
        });
        localStorage.removeItem('highlightedItems');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    WardrobeHighlight.init();
});
