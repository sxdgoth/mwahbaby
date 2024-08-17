// File: shopitems.js

class Avatar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with id "${containerId}" not found`);
        }
        this.wornItems = {};
        this.baseUrl = 'https://sxdgoth.github.io/mwahbaby/assets/'; // Adjust this URL as needed
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

    async wearItem(item) {
        console.log(`Wearing item: ${item.name}`);
        const svg = await this.loadSVG(item.svg);
        if (svg) {
            this.wornItems[item.type] = { svg, item };
            this.render();
        }
    }

    removeItem(itemType) {
        console.log(`Removing item type: ${itemType}`);
        delete this.wornItems[itemType];
        this.render();
    }

    getItemPosition(itemType) {
        const positions = {
            shirts: 'translate(0, 50) scale(1)',
            hoodies: 'translate(0, 40) scale(1.1)',
            face: 'translate(0, -60) scale(0.9)',
            head: 'translate(0, -70) scale(1)',
            // Add more item types and their positions as needed
        };

        return positions[itemType] || 'translate(0, 0) scale(1)'; // Default position
    }

    render() {
        console.log("Rendering avatar wearable items...");
        
        const bodySvg = document.getElementById('body-svg');
        if (!bodySvg) {
            console.error("Body SVG element not found");
            return;
        }
        
        const layerOrder = ['pants', 'shirts', 'hoodies', 'accessories', 'face', 'head'];
        
        // Remove existing wearable items
        bodySvg.querySelectorAll('g[data-item-type]').forEach(el => el.remove());

        // Add wearable items in the correct order
        layerOrder.forEach(itemType => {
            if (this.wornItems[itemType]) {
                const { svg, item } = this.wornItems[itemType];
                const parser = new DOMParser();
                const itemSvg = parser.parseFromString(svg, "image/svg+xml").documentElement;
                
                const itemGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
                itemGroup.setAttribute('data-item-type', itemType);
                
                // Move all child nodes of the SVG to the group
                while (itemSvg.firstChild) {
                    itemGroup.appendChild(itemSvg.firstChild);
                }

                // Apply item position
                const position = this.getItemPosition(itemType);
                itemGroup.setAttribute('transform', position);

                // Append the item group to the body SVG
                bodySvg.appendChild(itemGroup);
            }
        });

        console.log("Avatar wearable items rendered");
    }
}

// Initialize the avatar
const avatar = new Avatar('avatar-container');
avatar.initialize().catch(error => {
    console.error("Error initializing avatar:", error);
});

// Export the avatar instance for use in other scripts
window.avatar = avatar;
