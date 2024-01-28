import { lightTheme, darkTheme } from './themeProperties.ts';
import { applyThemeStylesheet, generateStylesheet } from './themeGenerator.ts';

export function initTheme() {
  document.addEventListener('DOMContentLoaded', () => {
    const themeStylesheet = generateStylesheet(lightTheme, darkTheme);
    applyThemeStylesheet(themeStylesheet);
  });

  darkMode.enabled = prefersDarkMode();
  setTheme();
}

export function prefersDarkMode(): boolean {
  return !window.matchMedia ||
    !window.matchMedia('(prefers-color-scheme: dark)').matches
    ? false
    : true;
}

export function setTheme(): void {
  document.documentElement.setAttribute(
    'data-theme',
    darkMode.enabled ? 'dark' : 'light'
  );
}

export const darkMode = {
  darkModeEnabled: false,
  get enabled() {
    return this.darkModeEnabled;
  },
  set enabled(isEnabled: boolean) {
    this.darkModeEnabled = isEnabled;
  },
};
