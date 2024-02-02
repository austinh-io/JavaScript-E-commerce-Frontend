import {
  userPreferredLightMode,
  updateLightMode,
  isDarkMode,
  currentTheme,
} from '../utils/themeManager';

const TPL_LightToggle = document.createElement('template');

const TPL_LightToggle_css = /* CSS */ `
<style>
  :host {
    --toggle-width: 3.25rem;
    --toggle-height: 1.75rem;

    --slider-size: 1.5rem;
    --slider-offset-left: 0.16rem;
    --slider-offset-bottom: calc((var(--toggle-height) * 0.5) - (var(--slider-size) * 0.5));
    --slider-translate: calc(var(--toggle-width) - (var(--slider-size) + (var(--slider-offset-left) * 2)));

    --icon-size: calc(var(--slider-size) * 0.9);
    --icon-offset: calc(var(--slider-offset-left) + 0.07rem);

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

  .slider:hover, .toggle input:focus + .slider {
    outline: 2px solid var(--color-primary-500);    
  }
  

  .icon {
    position: absolute;
    left: var(--icon-offset);

    display: flex;
    align-items: center;
    justify-content: center;

    height: var(--icon-size);
    width: var(--icon-size);

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

  .theme-toggle-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
  }
</style>
`;

TPL_LightToggle.innerHTML = /* HTML */ `
  ${TPL_LightToggle_css}

  <div class="theme-toggle-container">
    <label class="toggle">
      <input
        type="checkbox"
        id="light-toggle" />
      <span class="slider">
        <div class="icon">
          <box-icon
            type="solid"
            name=""
            color="">
          </box-icon>
        </div>
      </span>
    </label>
    <span class="toggle-label">Light</span>
  </div>
`;

class LightToggle extends HTMLElement {
  private _toggle: HTMLInputElement;
  private _toggleLabel: HTMLElement;
  private _toggleIcon: HTMLElement;
  private _toggleIconValues = new Map<boolean, string>();

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_LightToggle.content.cloneNode(true);
    shadow.append(clone);

    this._toggleIconValues.set(false, 'sun');
    this._toggleIconValues.set(true, 'moon');

    this._toggle = this.shadowRoot!.querySelector('#light-toggle')!;
    this._toggleLabel = this.shadowRoot!.querySelector('.toggle-label')!;
    this._toggleIcon = this.shadowRoot!.querySelector('box-icon')!;
  }

  connectedCallback() {
    this._toggle!.addEventListener('change', this.toggleLightMode.bind(this));
    this._toggle!.checked = userPreferredLightMode();
    this.updateToggleLabel(this._toggleLabel!);
    this.updateToggleIcon();
  }

  toggleLightMode(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    isDarkMode.enabled = checkbox.checked;

    updateLightMode();

    this.updateToggleLabel(this._toggleLabel!);
    this.updateToggleIcon();
  }

  updateToggleLabel(
    label: HTMLElement,
    darkText: string = 'Dark',
    lightTest: string = 'Light'
  ) {
    label.textContent = isDarkMode.enabled ? darkText : lightTest;
  }

  updateToggleIcon() {
    this._toggleIcon.setAttribute(
      'name',
      this._toggleIconValues.get(isDarkMode.enabled)!
    );
    this._toggleIcon.setAttribute(
      'color',
      currentTheme.theme.properties['--theme-font-color-inverse']
    );
  }
}

window.customElements.define('light-toggle', LightToggle);

export default LightToggle;
