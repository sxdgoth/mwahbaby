// notifications.js

const NotificationSystem = {
    container: null,

    init: function() {
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        document.body.appendChild(this.container);
    },

    show: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        this.container.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                this.container.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    NotificationSystem.init();
});
