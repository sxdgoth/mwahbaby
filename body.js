// body.js

class AvatarBody {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.baseUrl = 'https://sxdgoth.github.io/mwahbaby/assets/legendary/';
        this.bodyParts = [
            { name: 'Legs', file: 'avatar-legsandfeet.svg' },
            { name: 'Arms', file: 'avatar-armsandhands.svg' },
            { name: 'Body', file: 'avatar-body.svg' },
            { name: 'Head', file: 'avatar-head.svg' }
        ];
    }

    async initialize() {
        if (!this.container) {
            console.error('Avatar body container not found');
            return;
        }
        console.log('Initializing avatar body...');
        
        // Set container attributes based on the first SVG (assuming all have the same viewBox)
        const firstSVG = await this.loadSVG(this.bodyParts[0].file);
        if (firstSVG) {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(firstSVG, "image/svg+xml");
            const svgElement = svgDoc.documentElement;
            
            this.container.setAttribute('viewBox', svgElement.getAttribute('viewBox'));
        }
        // Clear the container
        this.container.innerHTML = '';
        // Render body parts in the correct order
        for (const part of this.bodyParts) {
            console.log(`Loading ${part.name}...`);
            const svgContent = await this.loadSVG(part.file);
            if (svgContent) {
                console.log(`${part.name} loaded successfully`);
                this.appendSVG(svgContent, part.name);
            } else {
                console.error(`Failed to load ${part.name}`);
            }
        }
        console.log('Avatar body initialization complete');
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

    appendSVG(svgContent, partName) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
        const svgElement = svgDoc.documentElement;
        // Create a group to wrap the SVG content
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("data-body-part", partName.toLowerCase());
        // Move all child nodes of the SVG to the group
        while (svgElement.firstChild) {
            group.appendChild(svgElement.firstChild);
        }
        // Append the group to the container
        this.container.appendChild(group);
    }

    async addItemToAvatar(item) {
        console.log('Adding item to avatar:', item);
        const svgContent = await this.loadSVG(item.id);
        if (svgContent) {
            this.appendSVG(svgContent, item.name);
        }
    }

    removeItemFromAvatar(item) {
        console.log('Removing item from avatar:', item);
        const itemElement = this.container.querySelector(`g[data-body-part="${item.name.toLowerCase()}"]`);
        if (itemElement) {
            itemElement.remove();
        }
    }

    setSkinTone(skinTone) {
        const skinElements = this.container.querySelectorAll('.skin');
        skinElements.forEach(element => {
            element.style.fill = skinTone;
        });
    }
}

// Initialize the avatar body when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const avatarBody = new AvatarBody('body-svg');
    avatarBody.initialize().then(() => {
        console.log("Avatar body initialized");
        
        // Add these methods to the window object so they can be called from other scripts
        window.addItemToAvatar = (item) => avatarBody.addItemToAvatar(item);
        window.removeItemFromAvatar = (item) => avatarBody.removeItemFromAvatar(item);
        window.setSkinTone = (skinTone) => avatarBody.setSkinTone(skinTone);

        // Set flag when avatar functions are ready
        window.avatarFunctionsReady = true;
    }).catch(error => {
        console.error("Error initializing avatar body:", error);
    });
});
