const TPL_AppDrawer = document.createElement('template');

const TPL_AppDrawer_css = /* CSS */ `
<style>
    :host {
      z-index: 1010;
      position: fixed;

      top: 0;
      right: 0;
      width: 100%;
    }

    .side-drawer {
      width: 10rem;
      height: 100svh;
      background: red;
    }
</style>
`;

TPL_AppDrawer.innerHTML = /* HTML */ `
  ${TPL_AppDrawer_css}

  <div class="side-drawer">
    <h3>Side Drawer</h3>
  </div>
`;

class AppDrawer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_AppDrawer.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {}
}

window.customElements.define('app-drawer', AppDrawer);

export default AppDrawer;
