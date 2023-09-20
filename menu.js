const cartMenu = document.querySelector('.cart-menu');
const cartToggle = document.querySelector('.cart-menu-toggle');
const cartToggleOpen = document.querySelector('.cart-menu-toggle-open');
const cartToggleClose = document.querySelector('.cart-menu-toggle-close');
// const menuResetButton = document.getElementById('menu-reset-button');

cartToggle.addEventListener('click', handleMenu);
cartToggleClose.addEventListener('click', handleMenu);
// menuResetButton.addEventListener('click', handleMenuResetButton);

function handleMenu() {
  const visibility = cartMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    cartMenu.setAttribute('data-visible', 'true');
    cartToggle.setAttribute('aria-expanded', 'true');
    // navToggleClose.setAttribute('style', 'display: block');
    // navToggleOpen.setAttribute('style', 'display: none');
  } else {
    cartMenu.setAttribute('data-visible', false);
    cartToggle.setAttribute('aria-expanded', 'false');
    // navToggleClose.setAttribute('style', 'display: none');
    // navToggleOpen.setAttribute('style', 'display: block');
  }
}

// function handleMenuResetButton() {
//   if (primaryNav.getAttribute('data-visible') === 'true') {
//     handleMenu();
//   }
// }
