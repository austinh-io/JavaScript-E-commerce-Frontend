import { DrawerOverlayManager } from '../../utils/ui/drawerOverlayManager.ts';
import { currentTheme } from '../../utils/ui/themeManager.ts';

const TPL_AppDrawer = document.createElement('template');

const TPL_AppDrawer_css = /* CSS */ `
<style>
    :host {
      z-index: 2010;
      position: fixed;

      bottom: 0;
      right: 0;

      height: 100svh;
      width: 28rem;
      backdrop-filter: blur(16px);

      transform: translateX(100%);

      transition: transform 250ms ease-in-out;
    }

    @media (max-width: 728px) {
      :host {
        max-width: 85%;
        height: 100%;
      }
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

      background: var(--color-surface-500);
    }

    .drawer-content {
      width: 100%;
      margin: 1rem;
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
      transition: background 100ms ease-out;
    }

    #close-button:hover {
      cursor: pointer;
      background: var(--color-surface-400);
    }

    #close-button:active {
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

      <h3
        id="drawer-title"
        drawerTitle></h3>
    </div>
    <div
      class="drawer-content"
      slot="drawer-content"></div>
  </div>
`;

export class AppDrawer extends HTMLElement {
  private _exitIcon: HTMLElement;
  private _closeButton: HTMLElement;
  private _drawerTitle: string;
  private _drawerTitleLabel: HTMLElement;
  private _isOpen: boolean;
  private _drawerContent: HTMLElement;
  private _name: string = '';

  constructor(drawerTitle: string = 'Drawer') {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_AppDrawer.content.cloneNode(true);
    shadow.append(clone);
    this._exitIcon = shadow.querySelector('#exit-icon')!;
    this._closeButton = shadow.querySelector('#close-button')!;
    this._drawerTitleLabel = shadow.querySelector('#drawer-title')!;
    this._drawerContent = shadow.querySelector('.drawer-content')!;

    this._drawerTitle = drawerTitle;
    this._drawerTitleLabel.textContent = this._drawerTitle;
    this._name = `${this._drawerTitle.toLowerCase()}Drawer`;

    this._isOpen = false;
    DrawerOverlayManager.addDrawer(this._name, this);
  }

  get drawerTitle() {
    return this._drawerTitle;
  }

  set drawerTitle(value: string) {
    this._drawerTitle = value;
    this._drawerTitleLabel.textContent = value;
  }

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) this.open();
    else if (!value) this.close();
  }

  get drawerContent() {
    return this._drawerContent;
  }

  set drawerContent(value: HTMLElement) {
    this._drawerContent.innerHTML = value.innerHTML;
  }

  connectedCallback() {
    document.addEventListener('themeChanged', () => {
      this.updateIconColor();
    });
    this.updateIconColor();
    this._closeButton.addEventListener('click', () => this.close());
  }

  updateIconColor() {
    this._exitIcon.setAttribute(
      'color',
      currentTheme.properties['--color-error-500']
    );
  }

  close() {
    this.style.transform = 'translateX(100%)';
    this._isOpen = false;
    DrawerOverlayManager.removeOpenDrawer(this._name);
    DrawerOverlayManager.closeOverlay();
  }

  open() {
    this.style.transform = 'translateX(0)';
    this._isOpen = true;
    DrawerOverlayManager.trackOpenDrawer(this._name);
  }

  toggle() {
    if (!this._isOpen) {
      this.open();
      DrawerOverlayManager.openOverlay();
    } else this.close();
  }

  appendToDrawerContent(value: HTMLElement) {
    this._drawerContent.append(value);
  }
}

window.customElements.define('app-drawer', AppDrawer);

export default AppDrawer;
