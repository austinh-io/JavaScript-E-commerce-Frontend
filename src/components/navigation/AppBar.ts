import { currentTheme } from '../../utils/themeManager';

const TPL_AppBar = document.createElement('template');

const TPL_AppBar_css = /* CSS */ `
<style>
    :host {
      z-index: 1010;
      position: fixed;

      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;

      top: 0;
      left: 0;

      width: 100%;
    }

    :host::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      background: var(--color-surface-700);
    }

    .app-bar {  
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;

        height: 4rem;
  
        padding-inline: 1rem;
  
      }
</style>
`;

TPL_AppBar.innerHTML = /* HTML */ `
  ${TPL_AppBar_css}
  <div class="app-bar">
    <slot></slot>
  </div>
`;

class AppBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_AppBar.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {}
}

window.customElements.define('app-bar', AppBar);

export default AppBar;
