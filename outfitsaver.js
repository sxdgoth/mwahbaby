// outfitsaver.js

const avatarContainer = document.getElementById('avatar-container');
const savedOutfitsContainer = document.getElementById('saved-outfits-container');
const saveBtn = document.getElementById('save-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');

function saveOutfit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to save outfits.');
        return;
    }

    const outfitSVG = avatarContainer.innerHTML;
    const savedOutfits = JSON.parse(localStorage.getItem('savedOutfits')) || {};
    
    if (!savedOutfits[currentUser.username]) {
        savedOutfits[currentUser.username] = [];
    }
    
    savedOutfits[currentUser.username].push(outfitSVG);
    localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
    alert('Outfit saved!');
    displaySavedOutfits();
}

function deleteOutfits() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please log in to delete outfits.');
        return;
    }

    const savedOutfits = JSON.parse(localStorage.getItem('savedOutfits')) || {};
    delete savedOutfits[currentUser.username];
    localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
    alert('All saved outfits deleted!');
    displaySavedOutfits();
}

function displaySavedOutfits() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const savedOutfits = JSON.parse(localStorage.getItem('savedOutfits')) || {};
    const userOutfits = savedOutfits[currentUser.username] || [];

    savedOutfitsContainer.innerHTML = '';

    userOutfits.forEach((outfit, index) => {
        const outfitElement = document.createElement('div');
        outfitElement.className = 'saved-outfit';
        outfitElement.innerHTML = outfit;
        outfitElement.addEventListener('click', () => {
            selectOutfit(index);
            loadOutfit(index);
        });
        savedOutfitsContainer.appendChild(outfitElement);
    });
}

function loadOutfit(index) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const savedOutfits = JSON.parse(localStorage.getItem('savedOutfits')) || {};
    const userOutfits = savedOutfits[currentUser.username] || [];

    if (userOutfits[index]) {
        avatarContainer.innerHTML = userOutfits[index];
    }
}

function selectOutfit(index) {
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
    if (saveBtn) {
        saveBtn.addEventListener('click', saveOutfit);
    }

    if (deleteAllBtn) {
        deleteAllBtn.addEventListener('click', deleteOutfits);
    }

    displaySavedOutfits();
});

// Make these functions available globally
window.saveOutfit = saveOutfit;
window.deleteOutfits = deleteOutfits;
window.displaySavedOutfits = displaySavedOutfits;
window.loadOutfit = loadOutfit;
window.selectOutfit = selectOutfit;
