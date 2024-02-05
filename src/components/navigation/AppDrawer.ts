const TPL_AppDrawer = document.createElement('template');

const TPL_AppDrawer_css = /* CSS */ `
<style>
    :host {
      z-index: 1010;
      position: fixed;

      bottom: 0;
      right: 0;

      height: 100svh;
      width: 24rem;

      background: var(--color-surface-800);

    }

    h3 {
      font-size: 2rem;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 0.1ch;

      background: var(--color-surface-400);

      width: 100%;
      
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .side-drawer {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
