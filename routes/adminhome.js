document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('.logout');

    logoutButton.addEventListener('click', () => {
        // Redirect to logout page
        window.location.href = '/logout';
    });
});
