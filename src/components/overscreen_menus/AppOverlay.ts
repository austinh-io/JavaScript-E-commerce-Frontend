import AppDrawer from './AppDrawer';

const overlayOpacityEnabledValue = 0.8;
const overlayOpacityDisabledValue = 0;

const TPL_AppOverlay = document.createElement('template');

const TPL_AppOverlay_css = /* CSS */ `
<style>
    :host {
      z-index: 1000;
    }

    .overlay {
      position: fixed;
      left: 0;
      bottom: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 100vw;
      height: 100vh;

      background-color: var(--color-surface-900);
      backdrop-filter: blur(12px);

      opacity: 0.8;
    }
</style>
`;

TPL_AppOverlay.innerHTML = /* HTML */ `
  ${TPL_AppOverlay_css}

  <div class="overlay"></div>
`;

class AppOverlay extends HTMLElement {
  private _overlay: HTMLElement;
  private _drawers: { [key: string]: AppDrawer };
  // private _siteNav: SiteNav;
  private _isEnabled: boolean;

  constructor(
    drawersValue: { [key: string]: AppDrawer },
    // siteNavValue: SiteNav,
    isEnabledValue: boolean = false
  ) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_AppOverlay.content.cloneNode(true);
    shadow.append(clone);

    this._overlay = shadow.querySelector('.overlay')!;
    this._drawers = { ...drawersValue };
    // this._siteNav = siteNavValue;
    this._isEnabled = isEnabledValue;
  }

  set drawers(value: { [key: string]: AppDrawer }) {
    this._drawers = { ...value };
  }

  get drawers() {
    return this._drawers;
  }

  // set navigation(value: SiteNav) {
  //   this._siteNav = value;
  // }

  // get navigation() {
  //   return this._siteNav;
  // }

  set isEnabled(value: boolean) {
    this._isEnabled = value;
  }

  get isEnabled() {
    return this._isEnabled;
  }

  connectedCallback() {
    this.disableOverlay();
    this._overlay.addEventListener('click', () => {
      this.close();
    });
  }

  enableOverlay() {
    this._overlay.style.opacity = String(overlayOpacityEnabledValue);
    this._overlay.style.pointerEvents = 'auto';
    document.querySelector('body')!.style.overflow = 'hidden';
    this._isEnabled = true;
  }

  disableOverlay() {
    this._overlay.style.opacity = String(overlayOpacityDisabledValue);
    this._overlay.style.pointerEvents = 'none';
    document.querySelector('body')!.style.overflow = 'auto';
    this._isEnabled = false;
  }

  closeDrawers() {
    for (const drawer in this._drawers) {
      this._drawers[drawer].close();
    }
  }

  toggleOverlay() {
    if (this._isEnabled) this.close();
    else this.open();

    this._isEnabled = !this._isEnabled;
  }

  open() {
    this.enableOverlay();
  }

  close() {
    this.disableOverlay();
    this.closeDrawers();
  }
}

window.customElements.define('drawer-overlay', AppOverlay);

export default AppOverlay;
