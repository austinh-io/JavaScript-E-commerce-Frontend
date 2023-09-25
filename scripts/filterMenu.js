const filterMenu = document.querySelector('.filter-menu');
const filterToggle = document.querySelector('.filter-menu-toggle');
const filterToggleOpen = document.querySelector('.filter-menu-toggle-open');
// const filterToggleClose = document.querySelector('.filter-menu-toggle-close');

filterToggle.addEventListener('click', handleMenu);
// filterToggleClose.addEventListener('click', handleMenu);

function handleMenu() {
  const visibility = filterMenu.getAttribute('data-visible');

  if (visibility === 'false') {
    filterMenu.setAttribute('data-visible', 'true');
    filterToggle.setAttribute('aria-expanded', 'true');
  } else {
    filterMenu.setAttribute('data-visible', false);
    filterToggle.setAttribute('aria-expanded', 'false');
  }
}
