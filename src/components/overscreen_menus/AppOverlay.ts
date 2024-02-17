import { BrowserCheck } from '../../utils/core/browserChecker';
import { DrawerOverlayManager } from '../../utils/ui/drawerOverlayManager';
import AppDrawer from './AppDrawer';

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

      transition: opacity 150ms ease-in-out;
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
  private _overlayOpacityEnabledValue = 0.8;
  private _overlayOpacityDisabledValue = 0;
  private _isEnabled: boolean;
  private _appBody: HTMLElement;

  constructor(
    drawersValue: { [key: string]: AppDrawer },
    isEnabledValue: boolean = false
  ) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_AppOverlay.content.cloneNode(true);
    shadow.append(clone);

    this._overlay = shadow.querySelector('.overlay')!;
    this._drawers = { ...drawersValue };
    this._isEnabled = isEnabledValue;

    this._appBody = document.querySelector('body')!;

    DrawerOverlayManager.addOverlay('overlay', this);
  }

  set drawers(value: { [key: string]: AppDrawer }) {
    this._drawers = { ...value };
  }

  get drawers() {
    return this._drawers;
  }

  set isEnabled(value: boolean) {
    this._isEnabled = value;
  }

  get isEnabled() {
    return this._isEnabled;
  }

  connectedCallback() {
    this.disableOverlay();
    this._overlay.addEventListener('click', () => {
      this.closeDrawers();
    });
  }

  enableOverlay() {
    this._overlay.style.opacity = String(this._overlayOpacityEnabledValue);
    this._overlay.style.pointerEvents = 'auto';
    document.querySelector('body')!.style.overflow = 'hidden';
    this._isEnabled = true;
    this.addScrollPadding();

    window.dispatchEvent(
      new CustomEvent('overlayOpened', {
        detail: {
          overlayIsOpen: true,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  disableOverlay() {
    this._overlay.style.opacity = String(this._overlayOpacityDisabledValue);
    this._overlay.style.pointerEvents = 'none';
    document.querySelector('body')!.style.overflow = 'auto';
    this._isEnabled = false;
    this.removeScrollPadding();

    window.dispatchEvent(
      new CustomEvent('overlayClosed', {
        detail: {
          overlayIsOpen: false,
        },
        bubbles: true,
        composed: true,
      })
    );
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
    console.log('overlay opened');
    this.enableOverlay();
  }

  close() {
    this.disableOverlay();
  }

  addScrollPadding() {
    if (BrowserCheck.isChromium()) {
      this._appBody.classList.add('lock-width-chromium');
    } else {
      this._appBody.classList.add('lock-width-firefox');
    }
  }

  removeScrollPadding() {
    if (BrowserCheck.isChromium()) {
      this._appBody.classList.remove('lock-width-chromium');
    } else {
      this._appBody.classList.remove('lock-width-firefox');
    }
  }

  disconnectedCallback() {
    this.disableOverlay();
    this._overlay.removeEventListener('click', () => {
      this.closeDrawers();
    });
    DrawerOverlayManager.removeOverlay('overlay');
  }
}

window.customElements.define('drawer-overlay', AppOverlay);

export default AppOverlay;
