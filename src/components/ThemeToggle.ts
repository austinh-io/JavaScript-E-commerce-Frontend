import {
  prefersDarkMode,
  setTheme,
  darkMode,
} from '../utils/theme/themeManager';

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
    background-color: var(--color-surface-600);
    -webkit-transition: var(--transition);
    transition: var(--transition);
    border-radius: var(--theme-rounded-base);
    outline: 2px solid var(--color-surface-700);

  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: var(--slider-size);
    width: var(--slider-size);
    left: var(--slider-offset-left);
    bottom: var(--slider-offset-bottom);
    background-color: var(--theme-font-color-base);
    -webkit-transition: var(--transition);
    transition: var(--transition);
    border-radius: var(--theme-rounded-base);
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(var(--slider-translate));
    -ms-transform: translateX(var(--slider-translate));
    transform: translateX(var(--slider-translate));
  }

  .themeToggleContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
  }
</style>
`;

TPL_ThemeToggle.innerHTML = /* HTML */ `
  ${TPL_ThemeToggle_css}

  <div class="themeToggleContainer">
    <label class="toggle">
      <input
        type="checkbox"
        id="themeToggle" />
      <span class="slider"></span>
    </label>
    <span class="themeToggleLabel">Light</span>
  </div>
`;

class ThemeToggle extends HTMLElement {
  private themeToggle: HTMLInputElement;
  private themeToggleLabel: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_ThemeToggle.content.cloneNode(true);
    shadow.append(clone);

    this.themeToggle = this.shadowRoot?.querySelector('#themeToggle')!;

    this.themeToggleLabel =
      this.shadowRoot?.querySelector('.themeToggleLabel')!;
  }

  connectedCallback() {
    this.themeToggle!.addEventListener('change', this.toggleTheme.bind(this));
    this.themeToggle!.checked = prefersDarkMode();
    this.updateToggleLabel(this.themeToggleLabel!);

    setTheme();
  }

  toggleTheme(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    darkMode.enabled = checkbox.checked;

    setTheme();

    this.updateToggleLabel(this.themeToggleLabel!);
  }

  updateToggleLabel(label: HTMLElement) {
    label.textContent = darkMode.enabled ? 'Dark' : 'Light';
  }
}

window.customElements.define('theme-toggle', ThemeToggle);

export default ThemeToggle;
