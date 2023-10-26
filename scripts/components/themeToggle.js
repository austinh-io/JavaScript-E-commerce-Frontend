import { baseUrl } from '/scripts/utilities/commerceUtilities.js';
('use strict');

const tpl_themeToggle = document.createElement('template');

/**
 * CSS template string for the product card component.
 * @type {string}
 */
const tpl_themeToggleCSS = `
<style>
    @import url(${baseUrl}/css/main.css);

  .checkbox {
    display: none;
  }

  .theme-toggle-switch {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.8rem;
    height: 2rem;
  }

  .switch-label {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;

    width: 3.8rem;
    height: 2rem;

    border-radius: 15px;
    background: var(--color-bg);
    outline: rgba(0, 0, 0, 0) solid 2px;

    cursor: pointer;

    transition: background-color 0.2s ease-out, outline 0.2s ease-out;
  }

  .switch-label:hover {
    outline: var(--color-accent) solid 2px ;
  }

  .switch-label::before {    
    content: '';

    position: absolute;
    right: 50%;

    width: 1.8rem;
    height: 1.8rem;

    background: var(--color-aux-bg);
    border-radius: 50%;

    transition: transform 0.2s ease-out;
  }

  .checkbox:checked + .switch-label::before {
    transform: translateX(100%);
  }

  j-symbol.theme-toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-toggle-icon svg{
    width: 1.2rem;
    height: 1.2rem;
    z-index: 1;
    stroke: var(--color-fg-alt)
  }

  .theme-toggle-icon-dark {
    position: relative;
    right: .3rem;
  }

  .theme-toggle-icon-light {
    position: relative;
    left: .3rem;
  }

  .active-theme svg {
    stroke: var(--color-aux);
    fill: var(--color-aux);
  }

</style>
`;

tpl_themeToggle.innerHTML = `
  ${tpl_themeToggleCSS}

  <div class="theme-toggle-switch">
    <input type="checkbox" id="theme-switch" class="checkbox">
    <label for="theme-switch" class="switch-label">
      <j-symbol
        class="theme-toggle-icon theme-toggle-icon-dark"
        name="half-moon"
      ></j-symbol>
      <j-symbol
        class="theme-toggle-icon theme-toggle-icon-light"
        name="sun"
      ></j-symbol>
    </label>
  </div>
`;

class themeToggle extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_themeToggle.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {}
}

window.customElements.define('theme-toggle', themeToggle);
