const colorThemes = document.querySelectorAll(`[name='theme'`);

const storeTheme = function (theme) {
  localStorage.setItem('theme', theme);
};

colorThemes.forEach((themeOption) => {
  themeOption.addEventListener('click', () => {
    storeTheme(themeOption.id);
  });
});

const retrieveTheme = function () {
  const activeTheme = localStorage.getItem('theme');
  colorThemes.forEach((themeOption) => {
    if (themeOption.id === activeTheme) {
      themeOption.checked = true;
    }
  });
};

document.onload = retrieveTheme();
