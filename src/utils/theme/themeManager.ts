import { lightTheme, darkTheme } from './themeProperties.ts';
import { applyThemeStylesheet, generateStylesheet } from './themeGenerator.ts';

export function initTheme(): void {
  document.addEventListener('DOMContentLoaded', () => {
    const themeStylesheet = generateStylesheet(lightTheme, darkTheme);
    applyThemeStylesheet(themeStylesheet);
  });

  isDarkMode.enabled = prefersDarkMode();
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
    isDarkMode.enabled ? 'dark' : 'light'
  );
}

export const isDarkMode = {
  darkModeEnabled: false,
  get enabled(): boolean {
    return this.darkModeEnabled;
  },
  set enabled(isEnabled: boolean) {
    this.darkModeEnabled = isEnabled;
  },
};
