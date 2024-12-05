// Toggle nav
const navbarBtn = document.getElementById('navbar-btn');
const mobileMenu = document.getElementById('mobile-menu');

navbarBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
});
