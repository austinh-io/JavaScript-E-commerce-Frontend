const cartMenu = document.querySelector('.cart-menu');
const cartToggle = document.querySelector('.cart-menu-toggle');
const cartToggleOpen = document.querySelector('.cart-menu-toggle-open');
const cartToggleClose = document.querySelector('.cart-menu-toggle-close');

cartToggle.addEventListener('click', handleMenu);
cartToggleClose.addEventListener('click', handleMenu);

function handleMenu() {
  const visibility = cartMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    cartMenu.setAttribute('data-visible', 'true');
    cartToggle.setAttribute('aria-expanded', 'true');
  } else {
    cartMenu.setAttribute('data-visible', false);
    cartToggle.setAttribute('aria-expanded', 'false');
  }
}
