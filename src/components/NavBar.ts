const TPL_NavBar = document.createElement('template');

const TPL_NavBar_css = /* CSS */ `
<style>
    div {
        border: 2px solid var(--color-secondary-700);
        border-radius: 5pt;
        padding: 0.6rem;
    }
</style>
`;

TPL_NavBar.innerHTML = /* HTML */ `
  ${TPL_NavBar_css}

  <div>
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
