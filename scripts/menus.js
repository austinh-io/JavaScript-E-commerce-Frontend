const filterMenu = document.querySelector('.filter-menu');
const filterToggle = document.querySelector('.filter-menu-toggle');

const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-menu-toggle');
const navToggleClose = document.querySelector('.nav-menu-toggle-close');

// filterToggle.addEventListener('click', handleFilterMenu);

// navMenu.addEventListener('click', handleNavMenu);
// navToggle.addEventListener('click', handleNavMenu);
// navToggleClose.addEventListener('click', handleNavMenu);

function handleFilterMenu() {
  const visibility = filterMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    filterMenu.setAttribute('data-visible', 'true');
    filterToggle.setAttribute('aria-expanded', 'true');
  } else {
    filterMenu.setAttribute('data-visible', false);
    filterToggle.setAttribute('aria-expanded', 'false');
  }
}

function handleNavMenu() {
  const visibility = navMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    navMenu.setAttribute('data-visible', 'true');
    navToggle.setAttribute('aria-expanded', 'true');
  } else {
    navMenu.setAttribute('data-visible', false);
    navToggle.setAttribute('aria-expanded', 'false');
  }
}

// --------- Cart ---------
const cartMenu = document.querySelector('.cart-menu');
const cartToggles = document.getElementsByClassName('cart-menu-toggle');
const cartToggleClose = document.querySelector('.cart-menu-toggle-close');

// for (let i = 0; i < cartMenus.length; i++) {
//   cartMenus[i].addEventListener('click')
// }

for (let i = 0; i < cartToggles.length; i++) {
  cartToggles[i].addEventListener('click', handleCartMenu);
}

// cartToggle.addEventListener('click', handleCartMenu);
cartToggleClose.addEventListener('click', handleCartMenu);

function handleCartMenu() {
  const visibility = cartMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    cartMenu.setAttribute('data-visible', 'true');
    // cartToggle.setAttribute('aria-expanded', 'true');
    for (let i = 0; i < cartToggles.length; i++) {
      cartToggles[i].setAttribute('aria-expanded', 'true');
    }
  } else {
    cartMenu.setAttribute('data-visible', false);
    // cartToggle.setAttribute('aria-expanded', 'false');
    for (let i = 0; i < cartToggles.length; i++) {
      cartToggles[i].setAttribute('aria-expanded', 'false');
    }
  }
}

// --------- Themes ---------
const themeToggle = document.getElementById('theme-toggle');
const themeIconDark = document.querySelector('.theme-icon-dark');
const themeIconLight = document.querySelector('.theme-icon-light');

themeToggle.addEventListener('click', handleThemeMenu);

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
  setColorTheme(getColorThemePreference());
}

updateTheme();
