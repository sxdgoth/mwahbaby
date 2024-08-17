// File: shop.js

function waitForAvatarFunctions() {
    return new Promise((resolve) => {
        if (window.avatarFunctionsReady) {
            resolve();
        } else {
            const checkInterval = setInterval(() => {
                if (window.avatarFunctionsReady) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        }
    });
}

waitForAvatarFunctions().then(() => {
    const shopItemsContainer = document.getElementById('shop-items');
    const categorySelector = document.getElementById('category-selector');
    const buyButton = document.getElementById('buy-btn');
    const clearAvatarButton = document.getElementById('clear-avatar-btn');
    let selectedItems = {}; // Object to keep track of selected items by type
    let currentCategory = 'all';

    function displayShopItems(category = 'all') {
        shopItemsContainer.innerHTML = ''; // Clear existing items
        avatarConfig.wearableItems.forEach(item => {
            if (category === 'all' || item.type === category) {
                const itemElement = createItemElement(item);
                shopItemsContainer.appendChild(itemElement);
            }
        });
    }

    function createItemElement(item) {
        const itemElement = document.createElement('div');
        itemElement.classList.add('shop-item');
        itemElement.setAttribute('data-item-id', item.id);
        
        const isOwned = isItemInInventory(item);
        if (isOwned) {
            itemElement.classList.add('owned');
        }

        itemElement.innerHTML = `
            <div class="item-preview">
                <img src="${avatarConfig.baseUrl}${item.id}" alt="${item.name}" class="item-image">
            </div>
            <h3 class="shop-item-name">${item.name}</h3>
            ${isOwned ? '<p class="shop-item-owned">Owned</p>' : `<p class="shop-item-price">$${item.price || 100}</p>`}
        `;

        itemElement.addEventListener('click', () => selectItem(item, itemElement));
        return itemElement;
    }

    function selectItem(item, element) {
        if (selectedItems[item.id] === item) {
            element.classList.remove('selected');
            delete selectedItems[item.id];
            window.removeItemFromAvatar(item.id);
        } else {
            if (selectedItems[item.id]) {
                const previousElement = document.querySelector(`.shop-item[data-item-id="${item.id}"].selected`);
                if (previousElement) {
                    previousElement.classList.remove('selected');
                }
                window.removeItemFromAvatar(selectedItems[item.id]);
            }
            selectedItems[item.id] = item;
            element.classList.add('selected');
            window.addItemToAvatar(item.id);
        }
    }

    function handleBuyClick() {
        const currentUser = UserManager.getCurrentUser();
        const selectedItem = Object.values(selectedItems)[0];
        if (selectedItem && !isItemInInventory(selectedItem)) {
            const currentCoins = UserManager.getUserCoins(currentUser);
            const itemPrice = selectedItem.price || 100; // Default price if not specified
            if (currentCoins >= itemPrice) {
                const newCoins = currentCoins - itemPrice;
                UserManager.setUserCoins(currentUser, newCoins);
                UserManager.addItemToUserInventory(currentUser, selectedItem);
                updateCoinDisplay(currentCoins, newCoins);
                NotificationSystem.show(`You bought ${selectedItem.name}!`);
                displayShopItems(currentCategory);
            } else {
                NotificationSystem.show("Not enough coins!", "error");
            }
        } else if (isItemInInventory(selectedItem)) {
            NotificationSystem.show("You already own this item!", "error");
        } else {
            NotificationSystem.show("Please select an item to buy.", "error");
        }
    }

    function clearAvatar() {
        Object.values(selectedItems).forEach(item => {
            window.removeItemFromAvatar(item.id);
        });
        selectedItems = {};
        document.querySelectorAll('.shop-item.selected').forEach(el => el.classList.remove('selected'));
    }

    function loadAvatarState() {
        const currentUser = UserManager.getCurrentUser();
        const savedAvatarState = UserManager.getUserAvatarState(currentUser);
        
        savedAvatarState.appliedItems.forEach(item => {
            window.addItemToAvatar(item.id);
            const itemElement = document.querySelector(`.shop-item[data-item-id="${item.id}"]`);
            if (itemElement) {
                itemElement.classList.add('selected');
            }
            selectedItems[item.id] = item;
        });
        // Apply saved skin tone
        if (typeof window.setSkinTone === 'function') {
            window.setSkinTone(savedAvatarState.skinTone);
        }
    }

    categorySelector.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
            currentCategory = button.getAttribute('data-category');
            displayShopItems(currentCategory);
        });
    });

    buyButton.addEventListener('click', handleBuyClick);
    clearAvatarButton.addEventListener('click', clearAvatar);

    // Initial display
    displayShopItems('all');
    loadAvatarState();
    updateCoinDisplay();
});

function isItemInInventory(item) {
    const currentUser = UserManager.getCurrentUser();
    const inventory = UserManager.getUserInventory(currentUser);
    return inventory.some(invItem => invItem.id === item.id);
}

function updateCoinDisplay(oldAmount, newAmount) {
    // ... (keep your existing updateCoinDisplay function)
}
