// File: shopManager.js

class ShopManager {
    constructor(shopContainerId, categorySelectorId, buyButtonId, clearAvatarButtonId) {
        this.shopContainer = document.getElementById(shopContainerId);
        this.categorySelector = document.getElementById(categorySelectorId);
        this.buyButton = document.getElementById(buyButtonId);
        this.clearAvatarButton = document.getElementById(clearAvatarButtonId);
        this.items = avatarConfig.wearableItems;
        this.currentCategory = 'all';
    }

    initialize() {
        this.setupEventListeners();
        this.displayItems();
        this.updateCoinDisplay();
    }

    setupEventListeners() {
        this.buyButton.addEventListener('click', () => this.handleBuyClick());
        this.clearAvatarButton.addEventListener('click', () => this.clearAvatar());
        
        this.categorySelector.querySelectorAll('.category-btn').forEach(button => {
            button.addEventListener('click', () => {
                this.currentCategory = button.getAttribute('data-category');
                this.displayItems(this.currentCategory);
            });
        });
    }

    displayItems(category = 'all') {
        this.shopContainer.innerHTML = '';
        this.items.forEach(item => {
            if (category === 'all' || item.type === category) {
                const itemElement = this.createItemElement(item);
                this.shopContainer.appendChild(itemElement);
            }
        });
        window.shopHandler.updateOwnedStatus();
    }

    createItemElement(item) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('shop-item');
        itemElement.setAttribute('data-item-id', item.id);

        itemElement.innerHTML = `
            <div class="item-preview">
                <img src="${avatarConfig.baseUrl}${item.id}" alt="${item.name}" class="item-image">
            </div>
            <h3 class="shop-item-name">${item.name}</h3>
            <p class="shop-item-price">${item.price} coins</p>
        `;

        return itemElement;
    }

    handleBuyClick() {
        const currentUser = UserManager.getCurrentUser();
        if (!currentUser) {
            alert("Please log in to purchase items.");
            return;
        }

        let totalCost = 0;
        let itemsToBuy = [];

        const selectedItems = window.shopHandler.getSelectedItems();
        Object.values(selectedItems).forEach(item => {
            if (!InventoryManager.isItemInInventory(item)) {
                totalCost += item.price;
                itemsToBuy.push(item);
            }
        });

        const userCoins = UserManager.getUserCoins(currentUser);

        if (totalCost > userCoins) {
            alert("Not enough coins to purchase selected items!");
            return;
        }

        if (itemsToBuy.length === 0) {
            alert("No new items to purchase. All selected items are already owned.");
            return;
        }

        const newCoins = userCoins - totalCost;

        itemsToBuy.forEach(item => {
            InventoryManager.addItemToInventory(item);
        });

        UserManager.setUserCoins(currentUser, newCoins);
        this.updateCoinDisplay(userCoins, newCoins);

        window.shopHandler.clearSelectedItems();
        this.displayItems(this.currentCategory);
        alert(`Items purchased successfully! You spent ${totalCost} coins.`);
    }

    clearAvatar() {
        window.shopHandler.clearSelectedItems();
        this.displayItems(this.currentCategory);
    }
    
    updateCoinDisplay(oldAmount, newAmount) {
        const coinDisplay = document.getElementById('coin-amount');
        const coinChange = document.getElementById('coin-change');
        
        if (coinDisplay && coinChange) {
            const currentUser = UserManager.getCurrentUser();
            const userCoins = newAmount !== undefined ? newAmount : UserManager.getUserCoins(currentUser);
            
            if (oldAmount !== undefined && oldAmount !== userCoins) {
                const difference = userCoins - oldAmount;
                const duration = 1000; // Animation duration in milliseconds
                const frames = 60; // Number of frames for the animation
                const step = difference / frames;
                
                let currentStep = 0;
                const animateChange = () => {
                    currentStep++;
                    const currentDifference = Math.round(step * currentStep);
                    const currentAmount = oldAmount + currentDifference;
                    
                    coinDisplay.textContent = currentAmount;
                    coinChange.textContent = difference > 0 ? `+${currentDifference}` : currentDifference;
                    coinChange.style.color = difference > 0 ? 'green' : 'red';
                    coinChange.style.opacity = '1';
                    
                    if (currentStep < frames) {
                        requestAnimationFrame(animateChange);
                    } else {
                        // Final state
                        coinDisplay.textContent = userCoins;
                        setTimeout(() => {
                            coinChange.style.opacity = '0';
                        }, 500); // Keep the final difference visible for a moment
                    }
                };
                
                animateChange();
            } else {
                coinDisplay.textContent = userCoins;
            }
        } else {
            console.error('Coin display elements not found');
        }
    }
}

// Initialize the shop manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const shopManager = new ShopManager('shop-items', 'category-selector', 'buy-btn', 'clear-avatar-btn');
    shopManager.initialize();
});
