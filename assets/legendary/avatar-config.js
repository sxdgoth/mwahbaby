// File: avatar-config.js

const avatarConfig = {
    // Base URL for all SVG files
    baseUrl: 'https://sxdgoth.github.io/mwahbaby/assets/legendary/',

    // Base items that make up the avatar, in rendering order
    baseItems: [
        { name: 'Legs', file: 'avatar-legsandfeet.svg' },
        { name: 'Arms', file: 'avatar-armsandhands.svg' },
        { name: 'Body', file: 'avatar-body.svg' },
        { name: 'Head', file: 'avatar-head.svg' }
    ],

    // Wearable items that can be toggled on and off
    wearableItems: [
        { name: 'Jacket', id: 'avatar-jacket.svg' },
        { name: 'Most Valuable Shirt', id: 'mostvaluableshirt.svg' },
        { name: 'Naja Bloom Top', id: 'najabloomtop.svg' },
    ]
};
