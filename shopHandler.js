// File: shopHandler.js

class ShopHandler {
    constructor() {
        this.shopContainer = document.getElementById('shop-items');
        this.selectedItems = {};
    }

    initialize() {
        this.updateOwnedStatus();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.shopContainer.addEventListener('click', (event) => {
            const itemElement = event.target.closest('.shop-item');
            if (itemElement) {
                const itemId = itemElement.getAttribute('data-item-id');
                const item = avatarConfig.wearableItems.find(i => i.id === itemId);
                if (item) {
                    this.toggleItem(item, itemElement);
                }
            }
        });
    }

    updateOwnedStatus() {
        const items = this.shopContainer.querySelectorAll('.shop-item');
        items.forEach(itemElement => {
            const itemId = itemElement.getAttribute('data-item-id');
            const item = avatarConfig.wearableItems.find(i => i.id === itemId);
            if (item && InventoryManager.isItemInInventory(item)) {
                this.markItemAsOwned(itemElement);
            }
        });
    }

    markItemAsOwned(itemElement) {
        itemElement.classList.add('owned');
        const priceElement = itemElement.querySelector('.shop-item-price');
        if (priceElement) {
            priceElement.textContent = 'Owned';
        }
    }

    toggleItem(item, element) {
        const isOwned = InventoryManager.isItemInInventory(item);
        
        if (isOwned) {
            if (element.classList.contains('selected')) {
                element.classList.remove('selected');
                window.removeItemFromAvatar(item);
            } else {
                element.classList.add('selected');
                window.addItemToAvatar(item);
            }
        } else {
            if (this.selectedItems[item.id]) {
                element.classList.remove('selected');
                delete this.selectedItems[item.id];
                window.removeItemFromAvatar(item);
            } else {
                this.selectedItems[item.id] = item;
                element.classList.add('selected');
                window.addItemToAvatar(item);
            }
        }
    }

    getSelectedItems() {
        return this.selectedItems;
    }

    clearSelectedItems() {
        this.selectedItems = {};
        this.shopContainer.querySelectorAll('.shop-item.selected').forEach(el => el.classList.remove('selected'));
    }
}

// Initialize the shop handler when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.shopHandler = new ShopHandler();
    window.shopHandler.initialize();
});
