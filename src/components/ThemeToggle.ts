import { lightTheme } from '../theme';

const TPL_ThemeToggle = document.createElement('template');

const TPL_ThemeToggle_css = /* CSS */ `
<style>
  :host {
    --toggle-width: 3.25rem;
    --toggle-height: 1.75rem;

    --slider-size: 1.5rem;
    --slider-offset-left: 0.2rem;
    --slider-offset-bottom: calc((var(--toggle-height) * 0.5) - (var(--slider-size) * 0.5));
    --slider-translate: calc(var(--toggle-width) - (var(--slider-size) + (var(--slider-offset-left) * 2)));

    --transition: 200ms ease;
  }

  .toggle {
    position: relative;
    display: inline-block;
    width: var(--toggle-width);
    height: var(--toggle-height);
  }
  
  .toggle input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-surface-200);
    -webkit-transition: var(--transition);
    transition: var(--transition);
    border-radius: var(--theme-rounded-base);
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: var(--slider-size);
    width: var(--slider-size);
    left: var(--slider-offset-left);
    bottom: var(--slider-offset-bottom);
    background-color: white;
    -webkit-transition: var(--transition);
    transition: var(--transition);
    border-radius: var(--theme-rounded-base);
  }
  
  input:checked + .slider {
    background-color: var(--color-primary-500);
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(var(--slider-translate));
    -ms-transform: translateX(var(--slider-translate));
    transform: translateX(var(--slider-translate));
  }
</style>
`;

TPL_ThemeToggle.innerHTML = /* HTML */ `
  ${TPL_ThemeToggle_css}

  <label class="toggle">
    <input
      type="checkbox"
      id="themeToggle" />
    <span class="slider"></span>
  </label>
`;

let darkMode: boolean = false;

function prefersDarkMode(): boolean {
  if (
    !window.matchMedia ||
    !window.matchMedia('(prefers-color-scheme: dark').matches
  ) {
    console.log('Does not prefer Dark Mode.');
    return false;
  } else {
    console.log('Prefers Dark Mode.');
    return true;
  }
}

class ThemeToggle extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_ThemeToggle.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {
    const themeToggle: HTMLInputElement =
      this.shadowRoot?.querySelector('#themeToggle')!;

    themeToggle.addEventListener('change', this.toggleTheme.bind(this));
    themeToggle.checked = prefersDarkMode();
  }

  toggleTheme(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    darkMode = checkbox.checked;
  }
}

window.customElements.define('theme-toggle', ThemeToggle);

export default ThemeToggle;
