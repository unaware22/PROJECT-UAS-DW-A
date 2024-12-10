const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
const menuBtnIcon = menuBtn.querySelector('i');


//navbar

menuBtn.addEventListener('click', (e) => {
  navLinks.classList.toggle('open');

  const isOpen = navLinks.classList.contains('open');
  menuBtnIcon.setAttribute('class', isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars');
});

navLinks.addEventListener('click', (e) => {
  navLinks.classList.remove('open');
  menuBtnIcon.setAttribute('class', 'ri-menu-line');
});

//animasi

const scrollRevealOption = {
  distance: '50px',
  origin: 'bottom',
  duration: 1000,
};

ScrollReveal().reveal('.header__image img', {
  ...scrollRevealOption,
  origin: 'right',
});
ScrollReveal().reveal('.header__content h2', {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal('.header__content h1', {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal('.order__card', {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal('.event__content', {
  duration: 1000,
});

ScrollReveal().reveal('.banner__container', {
  ...scrollRevealOption,
  interval: 1000,
});

// location
function initMap() {
  const location = { lat: -6.1754, lng: 106.8272 };
  const map = new google.maps.Map(document.getElementById('map'), {
    center: location, 
    zoom: 15, 
  });
  const marker = new google.maps.Marker({
    position: location, 
    map: map, 
    title: 'Lokasi Anda', 
  });
}

function loadGoogleMapsAPI() {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD9hBEEm9upz_GKh4ubR6pGhZ1dLkLYMus&callback=initMap';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

loadGoogleMapsAPI();


// Youtube
function showVideo() {
  document.getElementById('videoContainer').style.display = 'block';
  document.getElementById('videoOverlay').style.display = 'block';
}
function closeVideo() {
  document.getElementById('videoContainer').style.display = 'none';
  document.getElementById('videoOverlay').style.display = 'none';
}

