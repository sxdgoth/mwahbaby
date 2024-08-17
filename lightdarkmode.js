document.addEventListener('DOMContentLoaded', function() {
    const modeToggleBtn = document.getElementById('mode-toggle');
    
    modeToggleBtn.addEventListener('click', toggleDarkMode);

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Save the current mode preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update button text
        updateModeButtonText();
    }

    function updateModeButtonText() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        modeToggleBtn.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

    // Function to set the initial mode based on user's preference
    function setInitialMode() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
        updateModeButtonText();
    }

    // Call setInitialMode when the page loads
    setInitialMode();
});
