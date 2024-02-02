const TPL_NavBar = document.createElement('template');

const TPL_NavBar_css = /* CSS */ `
<style>
    :host {
      z-index: 900;
    }
    .main-nav-container {
      position: fixed;
      left: 0;
      bottom: 0;
      background-color: red;
      opacity: 0.01;
      width: 100vw;
      height: 100vh;
    }
</style>
`;

TPL_NavBar.innerHTML = /* HTML */ `
  ${TPL_NavBar_css}

  <div class="main-nav-container">
    <h3>Lorem Ipsum</h3>
    <p>An example component!</p>
  </div>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_NavBar.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallBack() {}
}

window.customElements.define('nav-bar', NavBar);

export default NavBar;
