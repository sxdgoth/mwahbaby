// File: avatar.js

class Avatar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
        }
        this.wornItems = {};
        this.baseUrl = avatarConfig.baseUrl;
    }

    async initialize() {
        console.log("Initializing avatar wearable items...");
        this.render();
        console.log("Avatar wearable items initialization complete");
    }

    async loadSVG(filename) {
        try {
            const url = this.baseUrl + filename;
            console.log(`Fetching SVG: ${url}`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const svgText = await response.text();
            console.log(`SVG loaded: ${filename}`);
            return svgText;
        } catch (error) {
            console.error(`Error loading SVG ${filename}:`, error);
            return null;
        }
    }

    async wearItem(itemId) {
        console.log(`Wearing item: ${itemId}`);
        const svg = await this.loadSVG(itemId);
        if (svg) {
            this.wornItems[itemId] = svg;
            this.render();
        }
    }

    removeItem(itemId) {
        console.log(`Removing item: ${itemId}`);
        delete this.wornItems[itemId];
        this.render();
    }

    render() {
        console.log("Rendering avatar wearable items...");
        
        const bodySvg = document.getElementById('body-svg');
        const headGroup = bodySvg.querySelector('g[data-body-part="head"]');
        
        // Remove existing wearable items
        const existingWearables = bodySvg.querySelector('g[data-body-part="wearables"]');
        if (existingWearables) {
            existingWearables.remove();
        }

        // Create a new group for wearable items
        const wearableGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        wearableGroup.setAttribute('data-body-part', 'wearables');

        // Add wearable items
        Object.values(this.wornItems).forEach(item => {
            const parser = new DOMParser();
            const itemSvg = parser.parseFromString(item, "image/svg+xml").documentElement;
            
            // Move all child nodes of the SVG to the group
            while (itemSvg.firstChild) {
                wearableGroup.appendChild(itemSvg.firstChild);
            }
        });

        // Insert the wearable group before the head
        if (headGroup) {
            bodySvg.insertBefore(wearableGroup, headGroup);
        } else {
            bodySvg.appendChild(wearableGroup);
        }

        console.log("Avatar wearable items rendered");
    }
}

// Usage
const avatar = new Avatar('avatar-container');
avatar.initialize().then(() => {
    createItemButtons();
}).catch(error => {
    console.error("Error initializing avatar:", error);
});

function createItemButtons() {
    const buttonContainer = document.getElementById('item-buttons');
    if (!buttonContainer) {
        console.error("Item buttons container not found");
        return;
    }

    avatarConfig.wearableItems.forEach(item => {
        const button = document.createElement('button');
        button.textContent = `Toggle ${item.name}`;
        button.addEventListener('click', () => toggleItem(item.id));
        buttonContainer.appendChild(button);
    });
    console.log("Item buttons created");
}

function toggleItem(itemId) {
    console.log(`Toggling item: ${itemId}`);
    if (avatar.wornItems[itemId]) {
        avatar.removeItem(itemId);
    } else {
        avatar.wearItem(itemId);
    }
}
