document.addEventListener('DOMContentLoaded', function() {
    const avatarSelect = document.getElementById('avatar-select');
    const avatarImage = document.getElementById('avatar-image');

    avatarSelect.addEventListener('change', function() {
        const selectedAvatar = this.value;
        avatarImage.src = `avatars/${selectedAvatar}`;
    });
});
