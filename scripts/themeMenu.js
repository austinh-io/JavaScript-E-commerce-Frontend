const themeMenu = document.querySelector('.theme-menu');
const themeToggle = document.querySelector('.theme-menu-toggle');
const themeToggleOpen = document.querySelector('.theme-menu-toggle-open');

themeToggle.addEventListener('click', handleMenu);

function handleMenu() {
  const visibility = themeMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    themeMenu.setAttribute('data-visible', 'true');
    themeToggle.setAttribute('aria-expanded', 'true');
  } else {
    themeMenu.setAttribute('data-visible', false);
    themeToggle.setAttribute('aria-expanded', 'false');
  }
}
