const TPL_CartMenu = document.createElement('template');

const TPL_CartMenu_css = /* CSS */ `
<style>
    .container {
        display: flex;
        flex-direction: column;

        gap: 1rem;

        border: 2px solid var(--color-secondary-700);
        border-radius: 5pt;

        padding: 0.6rem;
        margin: 0.6rem;
    }
</style>
`;

TPL_CartMenu.innerHTML = /* HTML */ `
  ${TPL_CartMenu_css}

  <div class="container">
    <cart-card></cart-card>
    <cart-card></cart-card>
  </div>
`;

class CartMenu extends HTMLElement {
  private _container: HTMLElement;
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_CartMenu.content.cloneNode(true);
    shadow.append(clone);
    this._container = shadow.querySelector('.container')!;
  }

  connectedCallback() {}

  appendToCart(value: HTMLElement) {
    console.log('Appended!');
    this._container.append(value);
  }
}

window.customElements.define('cart-menu', CartMenu);

export default CartMenu;
