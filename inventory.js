// inventory.js

const InventoryManager = {
    addItemToInventory: function(item) {
        const currentUser = UserManager.getCurrentUser();
        if (currentUser && !this.isItemInInventory(item)) {
            UserManager.addItemToUserInventory(currentUser, item.id);
            console.log(`Added item ${item.name} (${item.id}) to inventory for user ${currentUser}`); // Debug log
        }
    },

    getInventory: function() {
        const currentUser = UserManager.getCurrentUser();
        const inventory = currentUser ? UserManager.getUserInventory(currentUser) : [];
        console.log(`Current inventory for user ${currentUser}:`, inventory); // Debug log
        return inventory;
    },

    isItemInInventory: function(item) {
        const inventory = this.getInventory();
        const isOwned = inventory.includes(item.id);
        console.log(`Checking if item ${item.name} (${item.id}) is in inventory: ${isOwned}`); // Debug log
        return isOwned;
    }
};

// For backwards compatibility, you can keep these global functions
function addItemToInventory(item) {
    InventoryManager.addItemToInventory(item);
}

function removeFromInventory(itemId) {
    InventoryManager.removeFromInventory(itemId);
}

function getInventory() {
    return InventoryManager.getInventory();
}

function isItemInInventory(item) {
    return InventoryManager.isItemInInventory(item);
}
