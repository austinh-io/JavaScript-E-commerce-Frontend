import { CartItem } from '../../models/cartItem';
import { ProductGroup } from '../../models/productGroup';
import { Cart } from '../../utils/core/cartManager';
import { Catalog } from '../../utils/core/catalogManager';
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

export default class CartMenu extends HTMLElement {
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
    this.updateCartItems();

    window.addEventListener('addToCart', (event: Event) => {
      if (event instanceof CustomEvent) this.handleAddToCart(event);
    });
  }

  appendToMenu(value: HTMLElement) {
    this._container.append(value);
  }

  handleAddToCart(
    event: CustomEvent<{ productGroupId: string; productVariantId: string }>
  ) {
    const { productGroupId, productVariantId } = event.detail;

    if (this.itemInCart(productGroupId, productVariantId)) {
      // Item exists in cart, do nothing
      return;
    } else {
      // Item does not exist, create new cart card and add it to menu
      const cartItemId = Cart.getItemKey(productGroupId, productVariantId);
      const cartItem = Cart.getItem(cartItemId);
      const cartCard = new CartCard(cartItem);
      this.appendToMenu(cartCard);
    }
  }

  updateCartItems() {
    this._cartItems = Cart.getAllItems();

    for (const key in this._cartItems) {
      const cartCard = new CartCard(Cart.getItem(key));
      this._container.append(cartCard);
    }
  }

  itemInCart(itemGroupId: string, itemVariantId: string): boolean {
    const itemKey = Cart.getItemKey(itemGroupId, itemVariantId);
    const cartItem = Cart.getItem(itemKey);
    if (cartItem.count > 1) return true;
    else return false;
  }

  disconnectedCallback() {
    window.removeEventListener('addToCart', (event: Event) => {
      if (event instanceof CustomEvent) this.handleAddToCart(event);
    });
  }
}

window.customElements.define('cart-menu', CartMenu);
