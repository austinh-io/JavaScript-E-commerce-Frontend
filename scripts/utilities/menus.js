import { storeCartMenu } from '/scripts/utilities/cartUtilities.js';

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
let navToggleOpen = undefined;
let navToggleClose = undefined;
let navOverlay = undefined;
let navVisibility = undefined;

const mediaQuery = window.matchMedia('(min-width: 769px)');

function openNavOverlay() {
  navOverlay.style.opacity = '0.8';
  navOverlay.style.pointerEvents = 'auto';
  docBody.style.overflow = 'hidden';

  //Todo: below doesn't work right now. This is because of how I have both the navigation and cart menu setup.
  //When both of these open/close, one will activate and then the other will disable the first one, causing
  //the site to undo the lock-width thing it set.
  //I need to make it so that this is only enabled when any menu is open, and won't disable while any menu is open.
  if (isBrowserChromium()) {
    docBody.classList.add('lock-width-chromium');
    navHeader.classList.add('lock-width-chromium');
  } else {
    docBody.classList.add('lock-width-firefox');
    navHeader.classList.add('lock-width-firefox');
  }
}

function closeNavOverlay() {
  navOverlay.style.opacity = '0';
  navOverlay.style.pointerEvents = 'none';
  docBody.style.overflow = 'auto';

  //TODO: same as in openNavOverlay()
  if (isBrowserChromium()) {
    docBody.classList.remove('lock-width-chromium');
    navHeader.classList.remove('lock-width-chromium');
  } else {
    docBody.classList.remove('lock-width-firefox');
    navHeader.classList.remove('lock-width-firefox');
  }
}

export function handleNavMenu() {
  if (navVisibility === 'false') {
    headerContainer.setAttribute('data-visible', 'true');
    navToggleOpen.setAttribute('aria-expanded', 'true');

    openNavOverlay();
  } else {
    headerContainer.setAttribute('data-visible', 'false');
    navToggleOpen.setAttribute('aria-expanded', 'false');

    closeNavOverlay();
  }
  navVisibility = headerContainer.getAttribute('data-visible');
}

function updateNavMenuOnScreenSizeChange() {
  if (mediaQuery.matches) {
    headerContainer.setAttribute('data-visible', 'true');
    navToggleClose.setAttribute('data-visible', 'true');
    navToggleOpen.setAttribute('aria-expanded', 'true');
  } else {
    headerContainer.setAttribute('data-visible', 'false');
    navToggleClose.setAttribute('data-visible', 'false');
    navToggleOpen.setAttribute('aria-expanded', 'false');
    closeNavOverlay();
  }
}

// --------- Themes ---------
const themeToggle = document.querySelector('theme-toggle');
const themeLabel = document.querySelector('.theme-toggle-label');

let themeToggleSwitch = undefined;
let themeIconDark = undefined;
let themeIconLight = undefined;

function setThemeLocalStorage(theme) {
  localStorage.setItem('theme', theme);
}

function setColorTheme(theme) {
  switch (theme) {
    case 'dark':
      themeToggleSwitch.checked = false;
      themeIconDark.classList.add('active-theme');
      themeIconLight.classList.remove('active-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
      themeLabel.textContent = 'Dark';
      break;
    case 'light':
      themeToggleSwitch.checked = true;
      themeIconDark.classList.remove('active-theme');
      themeIconLight.classList.add('active-theme');
      document.documentElement.setAttribute('data-theme', 'light');
      themeLabel.textContent = 'Light';

      break;
    default:
      themeToggleSwitch.checked = true;
      themeIconDark.classList.remove('active-theme');
      themeIconLight.classList.add('active-theme');
      document.documentElement.setAttribute('data-theme', 'light');
      themeLabel.textContent = 'Light';

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

function initThemeMenu() {
  themeToggleSwitch = themeToggle.shadowRoot.getElementById('theme-switch');

  themeIconDark = themeToggle.shadowRoot.querySelector(
    '.theme-toggle-icon-dark'
  );
  themeIconLight = themeToggle.shadowRoot.querySelector(
    '.theme-toggle-icon-light'
  );

  themeToggleSwitch.addEventListener('click', handleThemeMenu);

  updateTheme();
}

// --------- Cart ---------
// const cartToggles = document.getElementsByClassName('cart-menu-toggle');
let cartToggles = undefined;
let cartMenu = undefined;
let navHeader = undefined;
let visibility = undefined;
let cartOverlay = undefined;

export function handleOpenCartMenu() {
  if (visibility === 'false') {
    cartMenu.setAttribute('data-visible', 'true');
    visibility = cartMenu.getAttribute('data-visible');
    cartOverlay.style.opacity = '0.8';
    cartOverlay.style.pointerEvents = 'auto';
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
    cartOverlay.style.opacity = '0';
    cartOverlay.style.pointerEvents = 'none';
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
  headerContainer = navMenu.shadowRoot.querySelector('.nav-menu-container');
  navToggleOpen = navMenu.shadowRoot.querySelector('.nav-toggle-open-button');
  navToggleClose = navMenu.shadowRoot.querySelector('.nav-menu-close-button');
  navOverlay = navMenu.shadowRoot.querySelector('.overlay');
  navVisibility = headerContainer.getAttribute('data-visible');

  if (navToggleOpen) {
    navToggleOpen.addEventListener('click', handleNavMenu);
    mediaQuery.addEventListener('change', updateNavMenuOnScreenSizeChange);
    addEventListener('load', updateNavMenuOnScreenSizeChange);
  }

  if (navToggleClose) {
    navToggleClose.addEventListener('click', handleNavMenu);
  }
}

function initCartMenu() {
  cartMenu = storeCartMenu.shadowRoot.querySelector('.cart-menu');
  navHeader = navMenu.shadowRoot.querySelector('.nav-menu-container');
  visibility = cartMenu.getAttribute('data-visible');
  cartOverlay = storeCartMenu.shadowRoot.querySelector('.overlay');
  cartToggles = navMenu.shadowRoot.querySelectorAll('.cart-menu-toggle');

  for (let cartToggle of cartToggles) {
    if (cartToggle) {
      cartToggle.addEventListener('click', handleOpenCartMenu);
    }
  }
}

function initMenus() {
  initNavMenu();
  initCartMenu();
  initThemeMenu();
}

let lastScrollTop = 0;
let cumulativeDelta = 0;
const delta = 100;

function navScrollBehavior() {
  const navHeaderHeightValue = '4'; //taken from the variables.css file
  const navHeaderHeightUnit = 'rem'; //taken from the variables.css file

  const currentScrollTop = window.scrollY;
  const scrollDifference = currentScrollTop - lastScrollTop;

  const direction = scrollDifference > 0 ? 1 : -1;

  if (mediaQuery.matches) {
    if (direction === (cumulativeDelta > 0 ? 1 : -1)) {
      cumulativeDelta += scrollDifference;
    } else {
      cumulativeDelta = scrollDifference;
    }

    if (direction === 1 && cumulativeDelta > delta) {
      navHeader.style.top = -navHeaderHeightValue + navHeaderHeightUnit;
    } else if (direction === -1 && -cumulativeDelta > delta) {
      navHeader.style.top = '0';
    }

    lastScrollTop = currentScrollTop;
  } else {
    navHeader.style.top = '0';
  }
}

document.addEventListener('DOMContentLoaded', initMenus);
window.addEventListener('scroll', navScrollBehavior);
