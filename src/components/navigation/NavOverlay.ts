const TPL_NavOverlay = document.createElement('template');

const TPL_NavOverlay_css = /* CSS */ `
<style>
    :host {
      z-index: 900;
    }
    .overlay {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;
    }
</style>
`;

TPL_NavOverlay.innerHTML = /* HTML */ `
  ${TPL_NavOverlay_css}

  <div class="overlay">
    <h3>(Testing Label) Navigation Overlay</h3>
  </div>
`;

class NavOverlay extends HTMLElement {
  private _overlay: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_NavOverlay.content.cloneNode(true);
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

window.customElements.define('nav-overlay', NavOverlay);

export default NavOverlay;
