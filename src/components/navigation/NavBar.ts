const TPL_NavBar = document.createElement('template');

const TPL_NavBar_css = /* CSS */ `
<style>
    :host {
      z-index: 900;
    }
    .nav {
      position: fixed;
      right: 0;
      bottom: 0;
      width: 15rem;
      height: 100svh;
      background-color: black;
      padding: 1rem;
    }
</style>
`;

TPL_NavBar.innerHTML = /* HTML */ `
  ${TPL_NavBar_css}

  <div class="nav">
    <h3>Navigation Component</h3>
  </div>
`;

class NavBar extends HTMLElement {
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
}

window.customElements.define('nav-bar', NavBar);

export default NavBar;
