// coinUtils.js

function updateCoinDisplay(oldAmount, newAmount) {
    console.log('updateCoinDisplay called', oldAmount, newAmount);
    const coinDisplay = document.getElementById('coin-amount');
    const coinChange = document.getElementById('coin-change');
    
    if (coinDisplay && coinChange) {
        const currentUser = UserManager.getCurrentUser();
        const userCoins = newAmount !== undefined ? newAmount : UserManager.getUserCoins(currentUser);
        
        coinDisplay.textContent = userCoins;

        if (oldAmount !== undefined && oldAmount !== userCoins) {
            const difference = userCoins - oldAmount;
            coinChange.textContent = difference > 0 ? `+${difference}` : difference;
            coinChange.style.color = difference > 0 ? 'green' : 'red';
            coinChange.style.opacity = '1';

            setTimeout(() => {
                coinChange.style.opacity = '0';
            }, 1000);
        }
    } else {
        console.error('Coin display elements not found');
    }
}
