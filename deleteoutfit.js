// deleteoutfit.js

const deleteOutfitBtn = document.getElementById('delete-outfit-btn');
let currentOutfitIndex = -1;

function deleteOutfit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to delete outfits.');
        return;
    }

    if (currentOutfitIndex === -1) {
        alert('Please select an outfit to delete.');
        return;
    }

    const savedOutfits = JSON.parse(localStorage.getItem('savedOutfits')) || {};
    const userOutfits = savedOutfits[currentUser.username] || [];

    if (currentOutfitIndex >= 0 && currentOutfitIndex < userOutfits.length) {
        userOutfits.splice(currentOutfitIndex, 1);
        savedOutfits[currentUser.username] = userOutfits;
        localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
        alert('Outfit deleted!');
        currentOutfitIndex = -1;
        displaySavedOutfits();
    } else {
        alert('Invalid outfit selection.');
    }
}

function selectOutfit(index) {
    currentOutfitIndex = index;
    const outfits = document.querySelectorAll('.saved-outfit');
    outfits.forEach((outfit, i) => {
        if (i === index) {
            outfit.classList.add('selected');
        } else {
            outfit.classList.remove('selected');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    if (deleteOutfitBtn) {
        deleteOutfitBtn.addEventListener('click', deleteOutfit);
    }

    // Update the displaySavedOutfits function in outfitsaver.js
    const originalDisplaySavedOutfits = window.displaySavedOutfits;
    window.displaySavedOutfits = function() {
        originalDisplaySavedOutfits();
        const outfits = document.querySelectorAll('.saved-outfit');
        outfits.forEach((outfit, index) => {
            outfit.addEventListener('click', () => {
                selectOutfit(index);
                loadOutfit(index);
            });
        });
    };

    // Call displaySavedOutfits to set up initial event listeners
    displaySavedOutfits();
});
