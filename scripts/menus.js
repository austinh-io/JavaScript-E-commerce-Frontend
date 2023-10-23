import { storeCartMenu } from './utilities/cartUtilities.js';

('use strict');

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

/**
 * Toggles the visibility of the navigation menu.
 */
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

/**
 * Updates the visibility of the navigation menu based on the screen size.
 * @function
 * @name updateNavMenuOnScreenSizeChange
 * @returns {void}
 */
function updateNavMenuOnScreenSizeChange() {
  if (mediaQuery.matches) navMenu.setAttribute('data-visible', 'true');
  else navMenu.setAttribute('data-visible', 'false');
}

// --------- Cart ---------
const cartToggles = document.getElementsByClassName('cart-menu-toggle');

for (let cartToggle of cartToggles) {
  if (cartToggle) {
    cartToggle.addEventListener('click', handleOpenCartMenu);
  }
}

/**
 * Toggles the visibility of the cart menu and updates the aria-expanded attribute of the cart toggles accordingly.
 */
export function handleOpenCartMenu() {
  const _cartMenu = storeCartMenu.shadowRoot.querySelector('.cart-menu');
  const visibility = _cartMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    _cartMenu.setAttribute('data-visible', 'true');

    for (let cartToggle of cartToggles)
      cartToggle.setAttribute('aria-expanded', 'true');
  }
}

export function handleCloseCartMenu(e) {
  const _cartMenu = e.target.closest('#cart-menu');
  const visibility = _cartMenu.getAttribute('data-visible');

  if (visibility === 'true') {
    _cartMenu.setAttribute('data-visible', 'false');

    for (let cartToggle of cartToggles)
      cartToggle.setAttribute('aria-expanded', 'false');
  }
}

/**
 * Opens the cart menu by setting the `data-visible` attribute to `true` and
 * updating the `aria-expanded` attribute of all cart toggles to `true`.
 */
export function openCartMenu() {
  const visibility = storeCartMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    storeCartMenu.setAttribute('data-visible', 'true');

    for (let cartToggle of cartToggles)
      cartToggle.setAttribute('aria-expanded', 'true');
  }
}

// --------- Themes ---------
const themeToggle = document.getElementById('theme-toggle');
const themeIconDark = document.querySelector('.theme-icon-dark');
const themeIconLight = document.querySelector('.theme-icon-light');

themeToggle.addEventListener('click', handleThemeMenu);

/**
 * Sets the selected theme in local storage.
 * @param {string} theme - The theme to be set in local storage.
 */
function setThemeLocalStorage(theme) {
  localStorage.setItem('theme', theme);
}

/**
 * Sets the color theme of the website based on the given theme parameter.
 * @param {string} theme - The color theme to set. Can be 'dark' or 'light'.
 */
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

/**
 * Returns the user's preferred color theme based on their device settings.
 * @returns {string} The preferred color theme ('dark' or 'light').
 */
function getColorThemePreference() {
  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark').matches) return 'dark';
    else return 'light';
  } else return 'light';
}

/**
 * Toggles between light and dark color themes based on the current theme.
 * @function
 * @name handleThemeMenu
 * @returns {void}
 */
function handleThemeMenu() {
  if (document.documentElement.getAttribute('data-theme') == 'dark') {
    setColorTheme('light');
  } else if (document.documentElement.getAttribute('data-theme') == 'light') {
    setColorTheme('dark');
  }
}

/**
 * Updates the color theme of the website based on the user's preference or stored value in local storage.
 * If no preference is found, it sets the color theme to the default value.
 */
function updateTheme() {
  if (localStorage.getItem('theme'))
    setColorTheme(localStorage.getItem('theme'));
  else setColorTheme(getColorThemePreference());
}

updateTheme();
