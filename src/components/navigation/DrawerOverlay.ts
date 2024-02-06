const TPL_DrawerOverlay = document.createElement('template');

const TPL_DrawerOverlay_css = /* CSS */ `
<style>
    :host {
      z-index: 1000;
    }
    .overlay {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;

      background-color: var(--color-surface-900);

      opacity: 0.2;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    h3 {
      font-size: 12rem;
      color: var(--color-primary-300);
    }
</style>
`;

TPL_DrawerOverlay.innerHTML = /* HTML */ `
  ${TPL_DrawerOverlay_css}

  <div class="overlay">
    <h3>(Testing Label)<br />Navigation Overlay</h3>
  </div>
`;

class DrawerOverlay extends HTMLElement {
  private _overlay: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_DrawerOverlay.content.cloneNode(true);
    shadow.append(clone);

    this._overlay = shadow.querySelector('.overlay')!;
  }

  connectedCallback() {
    this.disableOverlayPointerEvents();
  }

  enableOverlayPointerEvents() {
    this._overlay.style.pointerEvents = 'auto';
  }

  disableOverlayPointerEvents() {
    this._overlay.style.pointerEvents = 'none';
  }
}

window.customElements.define('drawer-overlay', DrawerOverlay);

export default DrawerOverlay;
