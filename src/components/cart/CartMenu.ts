import { CartItem } from '../../models/product';
import { CartManager } from '../../utils/core/cartManager';
import CartCard from './CartCard';

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

  <div class="container"></div>
`;

class CartMenu extends HTMLElement {
  private _container: HTMLElement;
  private _cartItems: { [key: string]: CartItem } = {};

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_CartMenu.content.cloneNode(true);
    shadow.append(clone);
    this._container = shadow.querySelector('.container')!;
  }

  connectedCallback() {
    this._cartItems = CartManager.getAllItems();

    for (const key in this._cartItems) {
      const cartCard = new CartCard(CartManager.getItem(key));
      this._container.append(cartCard);
    }
  }

  appendToCart(value: HTMLElement) {
    this._container.append(value);
  }
}

window.customElements.define('cart-menu', CartMenu);

export default CartMenu;
