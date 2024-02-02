import { lightMode, darkMode } from '../themes/defaultTheme.ts';
import { Theme } from '../types/Theme';

class ActiveTheme {
  private _theme: Theme;
  constructor(theme: Theme) {
    this._theme = theme;
  }
  get theme() {
    return this._theme;
  }
  set theme(theme: Theme) {
    this._theme = theme;
  }
}

export const currentTheme = new ActiveTheme(lightMode);

export const isDarkMode = {
  _enabled: false,
  get enabled(): boolean {
    return this._enabled;
  },
  set enabled(enable: boolean) {
    this._enabled = enable;
    updateLightMode();
  },
};

const themeChangeEvent = new CustomEvent('themeChanged', {
  detail: {
    newTheme: isDarkMode.enabled ? 'dark' : 'light',
  },
});

export function createStylesheet(lightTheme: Theme, darkTheme: Theme): string {
  let stylesheet = ":root[data-theme='light'] {\n";

  for (const [key, value] of Object.entries(lightTheme.properties)) {
    stylesheet += `${key}: ${value};\n`;
  }
  stylesheet += '}\n';

  stylesheet += ":root[data-theme='dark'] {\n";
  for (const [key, value] of Object.entries(darkTheme.properties)) {
    stylesheet += `${key}: ${value};\n`;
  }
  stylesheet += '}\n}\n';

  return stylesheet;
}

export function applyStylesheet(stylesheet: string): void {
  const styleTag = document.createElement('style');
  styleTag.textContent = stylesheet;
  document.head.appendChild(styleTag);
}

export function userPreferredLightMode(): boolean {
  return !window.matchMedia ||
    !window.matchMedia('(prefers-color-scheme: dark)').matches
    ? false
    : true;
}

export function updateLightMode(): void {
  document.documentElement.setAttribute(
    'data-theme',
    isDarkMode.enabled ? 'dark' : 'light'
  );
  currentTheme.theme = isDarkMode.enabled ? darkMode : lightMode;

  document.dispatchEvent(themeChangeEvent);
}

export function initLightMode(): void {
  document.addEventListener('DOMContentLoaded', () => {
    const themeStylesheet = createStylesheet(lightMode, darkMode);
    applyStylesheet(themeStylesheet);
  });

  isDarkMode.enabled = userPreferredLightMode();
  updateLightMode();
}

export function initIconColorUpdateListener() {
  document.addEventListener('themeChanged', function () {
    updateDefaultIconsColor();
  });
  updateDefaultIconsColor();
}

export function updateDefaultIconsColor() {
  const allBoxicons = document.querySelectorAll('box-icon');

  allBoxicons.forEach((icon) => {
    setIconAttribute(icon);
  });
}

function setIconAttribute(iconToSet: Element) {
  let parent: Element;

  if (!iconToSet.parentElement || !iconToSet.parentElement.parentElement) {
    return;
  } else if (!iconToSet.parentElement.parentElement) {
    parent = iconToSet.parentElement;
  } else {
    parent = iconToSet.parentElement.parentElement;
  }

  if (parent.classList.contains('btn-primary')) {
    iconToSet.setAttribute(
      'color',
      currentTheme.theme.properties['--color-on-primary']
    );
  } else if (parent.classList.contains('btn-secondary')) {
    iconToSet.setAttribute(
      'color',
      currentTheme.theme.properties['--color-on-secondary']
    );
  } else if (parent.classList.contains('btn-tertiary')) {
    iconToSet.setAttribute(
      'color',
      currentTheme.theme.properties['--color-on-tertiary']
    );
  }
}
