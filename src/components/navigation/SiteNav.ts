import { DrawerOverlayManager } from '../../utils/ui/drawerOverlayManager';
import { currentTheme } from '../../utils/ui/themeManager';
import AppDrawer from '../overscreen_menus/AppDrawer';
import AppOverlay from '../overscreen_menus/AppOverlay';

const TPL_SiteNav = document.createElement('template');

const TPL_SiteNav_css = /* CSS */ `
<style>
    :host {
      width: 100%;
      margin-block: auto;
    }
    nav {
      display: flex;
      align-items: center;
    }

    ul {
      display: flex;
      gap: 1rem;


      list-style: none;
    }

    a {
      color: var(--font-color-base);
      text-decoration: none;
    }

    a:hover {
      color: var(--color-primary-300);
    }

    .wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-inline: auto;

      width: 100%;
      max-width: 1240px;
    }

    .icon-button {
      display: flex;
      align-items: center;
      justify-content: center;

      border: none;
      padding: 0;
      margin: 0;

      width: 2rem;
      height: 2rem;
      background: none;

      cursor: pointer;
    }

    .icon-buttons-container {
      display: flex;
      gap: 0.8rem;
    }

    .hidden {
      display: none;
    }
</style>
`;

TPL_SiteNav.innerHTML = /* HTML */ `
  ${TPL_SiteNav_css}

  <nav>
    <div class="wrapper">
      <h3>Navigation Component</h3>
      <ul class="hidden">
        <li>
          <a href="#">Link 1</a>
        </li>
        <li>
          <a href="#">Link 2</a>
        </li>
        <li>
          <a href="#">Link 3</a>
        </li>
      </ul>
      <div class="icon-buttons-container">
        <button
          class="icon-button"
          id="btn-cart">
          <box-icon
            name="cart"
            size="lg"
            color="">
          </box-icon>
        </button>
        <button
          class="icon-button"
          id="btn-nav">
          <box-icon
            name="menu"
            size="lg"
            color="">
          </box-icon>
        </button>
      </div>
    </div>
  </nav>
`;

export class SiteNav extends HTMLElement {
  private _boxicons: NodeList;
  private _cartMenuButton: HTMLElement;
  private _navMenuButton: HTMLElement;
  private _drawers: { [key: string]: AppDrawer };
  private _overlay: AppOverlay | undefined;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_SiteNav.content.cloneNode(true);
    shadow.append(clone);
    this._boxicons = shadow.querySelectorAll('box-icon')!;
    this._cartMenuButton = shadow.querySelector('#btn-cart')!;
    this._navMenuButton = shadow.querySelector('#btn-nav')!;

    this._drawers = DrawerOverlayManager.getAllDrawers();
    this._overlay = DrawerOverlayManager.getOverlay();
  }

  set drawers(value: { [key: string]: AppDrawer }) {
    this._drawers = { ...value };
  }

  get drawers() {
    return this._drawers;
  }

  connectedCallback() {
    document.addEventListener('themeChanged', () => {
      this.updateIconColor();
    });

    this.updateIconColor();

    this._cartMenuButton.addEventListener('click', () => {
      this._drawers.cartDrawer.open();
      this.openOverlay();
    });

    this._navMenuButton.addEventListener('click', () => {
      this._drawers.navigationDrawer.open();
      this.openOverlay();
    });
  }

  updateIconColor() {
    this._boxicons.forEach((icon) => {
      if (icon instanceof Element)
        icon.setAttribute(
          'color',
          currentTheme.properties['--font-color-base']
        );
    });
  }

  openOverlay() {
    if (this._overlay) this._overlay.enableOverlay();
  }

  disconnectedCallback() {
    document.removeEventListener('themeChanged', () => {
      this.updateIconColor();
    });
  }
}

window.customElements.define('site-nav', SiteNav);

export default SiteNav;
