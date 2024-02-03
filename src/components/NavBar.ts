const TPL_NavBar = document.createElement('template');

const TPL_NavBar_css = /* CSS */ `
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

TPL_NavBar.innerHTML = /* HTML */ `
  ${TPL_NavBar_css}

  <div class="overlay">
    <h3>Navigation Component</h3>
  </div>
`;

class NavBar extends HTMLElement {
  private _overlay: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_NavBar.content.cloneNode(true);
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

window.customElements.define('nav-bar', NavBar);

export default NavBar;
