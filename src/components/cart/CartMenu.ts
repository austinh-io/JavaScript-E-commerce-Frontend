const TPL_CartMenu = document.createElement('template');

const TPL_CartMenu_css = /* CSS */ `
<style>
    div {
        display: flex;
        flex-direction: column;

        gap: 1rem;

        width: fit-content;
        max-width: 100%;

        border: 2px solid var(--color-secondary-700);
        border-radius: 5pt;
        padding: 0.6rem;
    }
</style>
`;

TPL_CartMenu.innerHTML = /* HTML */ `
  ${TPL_CartMenu_css}

  <div class="container">
    <cart-card></cart-card>
    <cart-card></cart-card>
    <cart-card></cart-card>
    <cart-card></cart-card>
    <cart-card></cart-card>
  </div>
`;

class CartMenu extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_CartMenu.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {}
}

window.customElements.define('cart-menu', CartMenu);

export default CartMenu;
