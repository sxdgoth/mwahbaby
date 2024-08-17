// wardrobeItemPositions.js

document.addEventListener('DOMContentLoaded', function() {
    const wardrobeList = document.getElementById('wardrobe-list');
    if (wardrobeList) {
        const observer = new MutationObserver(() => {
            const wardrobeItems = document.querySelectorAll('.wardrobe-item .item-image');
            wardrobeItems.forEach(item => {
                const itemType = item.alt.toLowerCase().split(' ')[0];
                applyItemPosition(item, itemType);
            });
        });
        observer.observe(wardrobeList, { childList: true, subtree: true });
    }
});



