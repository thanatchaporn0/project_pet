//java
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.querySelector('.logout');

    logoutButton.addEventListener('click', () => {
        
        window.location.href = '/logout';
        
    });
});
