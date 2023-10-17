// const checkoutButton = document.querySelector('.btn-checkout');

// checkoutButton.addEventListener('click', test);

// function test() {
//   console.log('clicked');
//   var lat = 'AMOGUS';
//   var long = 'heyyyyylol';

//   window.location.href = `archive/test.html?testVariable1=${encodeURIComponent(
//     lat
//   )}&testVariable2=${encodeURIComponent(long)}&setLatLon=Set`;
// }

// ---------- Filter Menu ---------- //
const filterMenu = document.querySelector('.filter-options-menu');
const filterToggle = document.querySelector('.filter-menu-toggle');

if (filterToggle) {
  filterToggle.addEventListener('click', handleFilterMenu);
}

function handleFilterMenu() {
  const visibility = filterMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    filterMenu.setAttribute('data-visible', 'true');
    filterToggle.setAttribute('aria-expanded', 'true');
  } else {
    filterMenu.setAttribute('data-visible', 'false');
    filterToggle.setAttribute('aria-expanded', 'false');
  }
}

/********* Navigation *********/
const navMenu = document.querySelector('.header-container');
const navToggle = document.querySelector('.nav-menu-toggle');

const mediaQuery = window.matchMedia('(min-width: 768px)');

navToggle.addEventListener('click', handleNavMenu);
mediaQuery.addEventListener('change', updateNavMenuOnScreenSizeChange);
addEventListener('load', updateNavMenuOnScreenSizeChange);

function handleNavMenu() {
  const visibility = navMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    navMenu.setAttribute('data-visible', 'true');
    // navToggle.setAttribute('aria-expanded', 'true');
  } else {
    navMenu.setAttribute('data-visible', 'false');
    // navToggle.setAttribute('aria-expanded', 'false');
  }
}

function updateNavMenuOnScreenSizeChange() {
  if (mediaQuery.matches) navMenu.setAttribute('data-visible', 'true');
  else navMenu.setAttribute('data-visible', 'false');
}

// --------- Cart ---------
const cartMenu = document.querySelector('.cart-menu');
const cartToggles = document.getElementsByClassName('cart-menu-toggle');
const cartToggleClose = document.querySelector('.cart-menu-toggle-close');
const catalogProductButtons = document.getElementsByClassName('button-product');

// for (let i = 0; i < cartToggles.length; i++) {
//   cartToggles[i].addEventListener('click', handleCartMenu);
// }

for (let cartToggle of cartToggles) {
  cartToggle.addEventListener('click', handleCartMenu);
}

// for (let catalogProductButton of catalogProductButtons) {

//   catalogProductButton.addEventListener('click', openCartMenu);
// }

cartToggleClose.addEventListener('click', handleCartMenu);

function handleCartMenu() {
  const visibility = cartMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    cartMenu.setAttribute('data-visible', 'true');

    for (let cartToggle of cartToggles)
      cartToggle.setAttribute('aria-expanded', 'true');
  } else {
    cartMenu.setAttribute('data-visible', 'false');

    for (let cartToggle of cartToggles)
      cartToggle.setAttribute('aria-expanded', 'false');
  }
}

function openCartMenu() {
  const visibility = cartMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    cartMenu.setAttribute('data-visible', 'true');

    for (let cartToggle of cartToggles)
      cartToggle.setAttribute('aria-expanded', 'true');
  }
}

// --------- Themes ---------
const themeToggle = document.getElementById('theme-toggle');
const themeIconDark = document.querySelector('.theme-icon-dark');
const themeIconLight = document.querySelector('.theme-icon-light');

themeToggle.addEventListener('click', handleThemeMenu);

function setThemeLocalStorage(theme) {
  localStorage.setItem('theme', theme);
}

// function getCartLocalStorage() {
//   let localSetTheme = localStorage.getItem('theme');
//   setColorTheme(localSetTheme);
// }

function setColorTheme(theme) {
  switch (theme) {
    case 'dark':
      themeIconDark.classList.remove('hidden');
      themeIconLight.classList.add('hidden');
      document.documentElement.setAttribute('data-theme', 'dark');
      break;
    case 'light':
      themeIconDark.classList.add('hidden');
      themeIconLight.classList.remove('hidden');
      document.documentElement.setAttribute('data-theme', 'light');
      break;
    default:
      themeIconDark.classList.add('hidden');
      themeIconLight.classList.remove('hidden');
      document.documentElement.setAttribute('data-theme', 'light');
      break;
  }
  setThemeLocalStorage(theme);
}

function getColorThemePreference() {
  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark').matches) return 'dark';
    else return 'light';
  } else return 'light';
}

function handleThemeMenu() {
  if (document.documentElement.getAttribute('data-theme') == 'dark') {
    setColorTheme('light');
  } else if (document.documentElement.getAttribute('data-theme') == 'light') {
    setColorTheme('dark');
  }
}

function updateTheme() {
  if (localStorage.getItem('theme'))
    setColorTheme(localStorage.getItem('theme'));
  else setColorTheme(getColorThemePreference());
}

updateTheme();
