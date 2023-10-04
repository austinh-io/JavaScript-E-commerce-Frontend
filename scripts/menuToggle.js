const cartMenu = document.querySelector('.cart-menu');
const cartToggle = document.querySelector('.cart-menu-toggle');
const cartToggleClose = document.querySelector('.cart-menu-toggle-close');

const themeMenu = document.querySelector('.theme-menu');
const themeToggle = document.querySelector('.theme-menu-toggle');

const filterMenu = document.querySelector('.filter-menu');
const filterToggle = document.querySelector('.filter-menu-toggle');

const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-menu-toggle');
const navToggleClose = document.querySelector('.nav-menu-toggle-close');

cartToggle.addEventListener('click', handleCartMenu);
cartToggleClose.addEventListener('click', handleCartMenu);

// themeToggle.addEventListener('click', handleThemeMenu);

// filterToggle.addEventListener('click', handleFilterMenu);

// navMenu.addEventListener('click', handleNavMenu);
// navToggle.addEventListener('click', handleNavMenu);
// navToggleClose.addEventListener('click', handleNavMenu);

function handleCartMenu() {
  const visibility = cartMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    cartMenu.setAttribute('data-visible', 'true');
    cartToggle.setAttribute('aria-expanded', 'true');
  } else {
    cartMenu.setAttribute('data-visible', false);
    cartToggle.setAttribute('aria-expanded', 'false');
  }
}

function handleThemeMenu() {
  const visibility = themeMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    themeMenu.setAttribute('data-visible', 'true');
    themeToggle.setAttribute('aria-expanded', 'true');
  } else {
    themeMenu.setAttribute('data-visible', false);
    themeToggle.setAttribute('aria-expanded', 'false');
  }
}

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
