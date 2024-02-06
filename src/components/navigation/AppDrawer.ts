import { currentTheme } from '../../utils/themeManager';

const TPL_AppDrawer = document.createElement('template');

const TPL_AppDrawer_css = /* CSS */ `
<style>
    :host {
      z-index: 1010;
      position: fixed;

      bottom: 0;
      right: 0;

      height: 100svh;
      width: 28rem;
      backdrop-filter: blur(16px);

      transition: transform 250ms ease-in-out;
    }
    
    :host::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.8;
      background: var(--color-surface-600);
    }

    h3 {
      font-size: 1.4rem;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.1ch;


      width: 100%;
      
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .app-drawer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 4.2rem;

      background: var(--color-surface-400);
    }

    #close-button {
      display: flex;
      align-items: center;
      justify-content: center;
      
      padding: 0;
      margin: 0;

      border: none;
      background: none;      

      height: 100%;

      background: var(--color-surface-500);
    }

    #close-button:hover {
      cursor: pointer;
      background: var(--color-surface-600);
    }
</style>
`;

TPL_AppDrawer.innerHTML = /* HTML */ `
  ${TPL_AppDrawer_css}

  <div class="app-drawer">
    <div class="drawer-header">
      <button id="close-button">
        <box-icon
          name="x"
          size="4.2rem"
          id="exit-icon"></box-icon>
      </button>

      <h3>Side Drawer</h3>
    </div>
    <div class="drawer-content">
      <slot name="drawer-content"></slot>
    </div>
  </div>
`;

export class AppDrawer extends HTMLElement {
  private _exitIcon: HTMLElement;
  private _closeButton: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_AppDrawer.content.cloneNode(true);
    shadow.append(clone);
    this._exitIcon = shadow.querySelector('#exit-icon')!;
    this._closeButton = shadow.querySelector('#close-button')!;
  }

  connectedCallback() {
    document.addEventListener('themeChanged', () => {
      this.updateIconColor();
    });
    this.updateIconColor();
    this._closeButton.addEventListener('click', () => this.closeDrawer());
  }

  updateIconColor() {
    this._exitIcon.setAttribute(
      'color',
      currentTheme.theme.properties['--color-error-500']
    );
  }

  closeDrawer() {
    this.style.transform = 'translateX(100%)';
  }

  openDrawer() {
    this.style.transform = 'translateX(0)';
  }
}

window.customElements.define('app-drawer', AppDrawer);

export default AppDrawer;
