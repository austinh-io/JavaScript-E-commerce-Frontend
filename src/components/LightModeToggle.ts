import {
  prefersDarkMode,
  setThemeMode,
  isDarkMode,
} from '../utils/themeManager';

class LightModeToggleIcon {
  private _icon: string;

  constructor(isDarkMode: boolean) {
    this._icon = isDarkMode ? 'moon' : 'sun';
  }

  get icon(): string {
    return this._icon;
  }

  set icon(isDarkMode: boolean) {
    this._icon = isDarkMode ? 'moon' : 'sun';
  }
}

let toggleIcon = new LightModeToggleIcon(isDarkMode.enabled);

const TPL_LightModeToggle = document.createElement('template');

const TPL_LightModeToggle_css = /* CSS */ `
<style>
  :host {
    --toggle-width: 3.25rem;
    --toggle-height: 1.75rem;

    --slider-size: 1.5rem;
    --slider-offset-left: 0.2rem;
    --slider-offset-bottom: calc((var(--toggle-height) * 0.5) - (var(--slider-size) * 0.5));
    --slider-translate: calc(var(--toggle-width) - (var(--slider-size) + (var(--slider-offset-left) * 2)));

    --icon-size: calc(var(--slider-size) * 0.9);
    --icon-offset: calc(var(--slider-offset-left) * 1.4);

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
    display: flex;
    align-items: center;

    position: absolute;

    cursor: pointer;

    inset: 0;

    background-color: var(--color-surface-600);
    outline: 2px solid var(--color-surface-700);
    border-radius: var(--theme-rounded-base);

    transition: var(--transition);
  }

  .icon {
    position: absolute;
    left: var(--icon-offset);

    display: flex;
    align-items: center;
    justify-content: center;

    height: var(--icon-size);
    width: var(--icon-size);
    fill: var(--theme-font-color-inverse);

    z-index: 10;

    transition: var(--transition);
  }

  .icon-disabled {
    display: none;
  }

  input:checked + .slider .icon {
    transform: translateX(var(--slider-translate));
  }

  box-icon {
    width: 100%;
    height: 100%;
  }
  
  .slider:before {
    position: absolute;

    content: "";

    height: var(--slider-size);
    width: var(--slider-size);
    
    left: var(--slider-offset-left);
    bottom: var(--slider-offset-bottom);

    background-color: var(--theme-font-color-base);
    border-radius: var(--theme-rounded-base);

    transition: var(--transition);
  }
  
  input:checked + .slider:before {
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

TPL_LightModeToggle.innerHTML = /* HTML */ `
  ${TPL_LightModeToggle_css}

  <div class="themeToggleContainer">
    <label class="toggle">
      <input
        type="checkbox"
        id="themeToggle" />
      <span class="slider">
        <div class="icon">
          <box-icon
            type="solid"
            name=""></box-icon>
        </div>
      </span>
    </label>
    <span class="themeToggleLabel">Light</span>
  </div>
`;

class LightModeToggle extends HTMLElement {
  private _lightModeToggle: HTMLInputElement;
  private _lightModeToggleLabel: HTMLElement;
  private _lightModeToggleIcon: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_LightModeToggle.content.cloneNode(true);
    shadow.append(clone);

    this._lightModeToggle = this.shadowRoot?.querySelector('#themeToggle')!;

    this._lightModeToggleLabel =
      this.shadowRoot?.querySelector('.themeToggleLabel')!;

    this._lightModeToggleIcon = this.shadowRoot?.querySelector('box-icon')!;

    this.updateToggleIcon();
  }

  connectedCallback() {
    this._lightModeToggle!.addEventListener(
      'change',
      this.toggleLightMode.bind(this)
    );
    this._lightModeToggle!.checked = prefersDarkMode();
    this.updateToggleLabel(this._lightModeToggleLabel!);

    setThemeMode();
  }

  toggleLightMode(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    isDarkMode.enabled = checkbox.checked;

    setThemeMode();

    this.updateToggleLabel(this._lightModeToggleLabel!);
    this.updateToggleIcon();
  }

  updateToggleLabel(label: HTMLElement) {
    label.textContent = isDarkMode.enabled ? 'Dark' : 'Light';
  }

  updateToggleIcon() {
    toggleIcon.icon = isDarkMode.enabled;
    this._lightModeToggleIcon.setAttribute('name', toggleIcon.icon);
  }
}

window.customElements.define('theme-toggle', LightModeToggle);

export default LightModeToggle;
