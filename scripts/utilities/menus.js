import { storeCartMenu } from '../utilities/cartUtilities.js';

('use strict');

const docBody = document.querySelector('body');
const navMenu = document.querySelector('nav-menu');

// ---------- Filter Menu ---------- //
const filterMenu = document.querySelector('.filter-options-container');
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
let headerContainer = undefined;
let navToggle = undefined;

const mediaQuery = window.matchMedia('(min-width: 768px)');

/**
 * Toggles the visibility of the navigation menu.
 */
function handleNavMenu() {
  const visibility = headerContainer.getAttribute('data-visible');

  if (visibility === 'false') {
    headerContainer.setAttribute('data-visible', 'true');
    // navToggle.setAttribute('aria-expanded', 'true');
  } else {
    headerContainer.setAttribute('data-visible', 'false');
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
  if (mediaQuery.matches) headerContainer.setAttribute('data-visible', 'true');
  else headerContainer.setAttribute('data-visible', 'false');
}

// --------- Themes ---------
let themeToggle = undefined;
let themeIconDark = undefined;
let themeIconLight = undefined;

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
      themeToggle.checked = false;
      themeIconDark.classList.add('active-theme');
      themeIconLight.classList.remove('active-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
      break;
    case 'light':
      themeToggle.checked = true;
      themeIconDark.classList.remove('active-theme');
      themeIconLight.classList.add('active-theme');
      document.documentElement.setAttribute('data-theme', 'light');
      break;
    default:
      themeToggle.checked = true;
      themeIconDark.classList.remove('active-theme');
      themeIconLight.classList.add('active-theme');
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

// --------- Cart ---------
// const cartToggles = document.getElementsByClassName('cart-menu-toggle');
let cartToggles = undefined;
let cartMenu = undefined;
let navHeader = undefined;
let visibility = undefined;
let overlay = undefined;

/**
 * Toggles the visibility of the cart menu and updates the aria-expanded attribute of the cart toggles accordingly.
 */
export function handleOpenCartMenu() {
  if (visibility === 'false') {
    cartMenu.setAttribute('data-visible', 'true');
    visibility = cartMenu.getAttribute('data-visible');
    overlay.style.opacity = '0.8';
    overlay.style.pointerEvents = 'auto';
    docBody.style.overflow = 'hidden';

    if (isBrowserChromium()) {
      docBody.classList.add('lock-width-chromium');
      navHeader.classList.add('lock-width-chromium');
    } else {
      docBody.classList.add('lock-width-firefox');
      navHeader.classList.add('lock-width-firefox');
    }

    for (let cartToggle of cartToggles)
      cartToggle.setAttribute('aria-expanded', 'true');
  }
}

export function handleCloseCartMenu() {
  if (visibility === 'true') {
    cartMenu.setAttribute('data-visible', 'false');
    visibility = cartMenu.getAttribute('data-visible');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    docBody.style.overflow = 'auto';

    if (isBrowserChromium()) {
      docBody.classList.remove('lock-width-chromium');
      navHeader.classList.remove('lock-width-chromium');
    } else {
      docBody.classList.remove('lock-width-firefox');
      navHeader.classList.remove('lock-width-firefox');
    }

    for (let cartToggle of cartToggles)
      cartToggle.setAttribute('aria-expanded', 'false');
  }
}

function isBrowserChromium() {
  const isFirefox = typeof InstallTrigger !== 'undefined';
  const isChromium = !!window.chrome;

  if (isChromium) {
    return true;
  } else if (isFirefox) {
    return false;
  }
}

function initNavMenu() {
  headerContainer = navMenu.shadowRoot.querySelector('.header-container');
  navToggle = navMenu.shadowRoot.querySelector('.nav-menu-toggle');

  if (navToggle) {
    navToggle.addEventListener('click', handleNavMenu);
    mediaQuery.addEventListener('change', updateNavMenuOnScreenSizeChange);
    addEventListener('load', updateNavMenuOnScreenSizeChange);
  }
}

function initCartMenu() {
  cartMenu = storeCartMenu.shadowRoot.querySelector('.cart-menu');
  navHeader = navMenu.shadowRoot.querySelector('.header-container');
  visibility = cartMenu.getAttribute('data-visible');
  overlay = storeCartMenu.shadowRoot.querySelector('.overlay');
  cartToggles = navMenu.shadowRoot.querySelectorAll('.cart-menu-toggle');

  for (let cartToggle of cartToggles) {
    if (cartToggle) {
      cartToggle.addEventListener('click', handleOpenCartMenu);
    }
  }
}

function initThemeMenu() {
  themeToggle = navMenu.shadowRoot.getElementById('theme-switch');
  themeIconDark = navMenu.shadowRoot.querySelector('.theme-toggle-icon-dark');
  themeIconLight = navMenu.shadowRoot.querySelector('.theme-toggle-icon-light');

  themeToggle.addEventListener('click', handleThemeMenu);

  updateTheme();
}

function initMenus() {
  initNavMenu();
  initCartMenu();
  initThemeMenu();
}

document.addEventListener('DOMContentLoaded', initMenus);
