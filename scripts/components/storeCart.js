import {
  formatCurrency,
  findItem,
  baseUrl,
  catchProductList,
  catalogProducts,
} from '/scripts/utilities/commerceUtilities.js';

import {
  addToCart,
  cartItems,
  storeCartMenu,
  removeFromCart,
  subtractFromCart,
  updateCatalogProductButton,
} from '../utilities/cartUtilities.js';

import { openCartMenu, handleCloseCartMenu } from '../menus.js';

('use strict');

const tpl_storeCart = document.createElement('template');

/**
 * CSS template string for the product card component.
 * @type {string}
 */
const tpl_storeCartCSS = `
<style>
    @import url(${baseUrl}/css/shared.css);

    :host {
      /*Uncomment the height below if you want all cards to be the same height, as they currently
      can be shorter or taller if they have more or less options. Right now the image will grow as the
      card grows, so if that bothers you then turn this on.*/

      /*height: 100%;*/
      /*width: 100%;*/

      z-index: 900;
    }

    .cart-menu {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    
      position: fixed;
      right: 0;
    
      height: 100svh;
      width: 34rem;
    
      background-color: var(--color-bg-trans);
      backdrop-filter: blur(50px);
    }
    
    .cart-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    
      background-color: var(--color-fg);
    
      width: 100%;
    }
    
    .cart-menu-header-title {
      padding-left: 1rem;
      font-size: 2rem;
    }
    
    .cart-menu-toggle-close {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.6rem;
      border: none;
      cursor: pointer;
    
      background-color: var(--color-font);
      color: var(--color-fg);
    }
    
    .cart-menu-toggle-close:hover {
      .cart-menu-toggle-icon svg{
        stroke: var(--color-warning);
      }
    }
    
    .cart-menu-toggle-icon svg{
      stroke: var(--color-fg);
    }
    
    .cart-items-container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
    
      padding: 1rem;
    
      gap: 1rem;
    
      margin-top: 1rem;
    
      height: 100%;
    
      overflow-y: auto;
    }
    
    .cart-display-footer {
      margin-top: auto;
      padding: 1rem;
    }
    
    .subtotal-label {
      font-size: 0.8rem;
    }
    
    .total-cost-value {
      font-size: 2rem;
      font-weight: 600;
    }
    
    a.btn-checkout {
      text-decoration: none;
    }
    
    button.btn-checkout,
    a.btn-checkout {
      display: flex;
      align-items: center;
      justify-content: center;
    
      width: 100%;
      padding: 1rem;
      font-size: 1.2rem;
      text-transform: uppercase;
      font-weight: 700;
      border: none;
      border-radius: 3pt;
      cursor: pointer;
    
      background-color: var(--color-font);
      color: var(--color-fg);
    }
    
    button.btn-checkout:hover,
    a.btn-checkout:hover {
      background-color: var(--color-fg);
      color: var(--color-font);
      outline: 5px solid var(--color-accent);

      .checkout-icon svg {
        stroke: var(--color-font);
        stroke-width: 3;
      }
    }
    
    .checkout-icon svg {
      font-weight: 700;
      font-size: 1.4rem;
      margin-left: 0.6rem;
      stroke: var(--color-fg);
    }
</style>
`;

tpl_storeCart.innerHTML = `
${tpl_storeCartCSS}
  <div
  class="cart-menu menu-horizontal menu-shadow"
  id="cart-menu"
  data-visible="false"
  >
    <div class="cart-menu-header">
      <div class="cart-menu-header-title">Cart</div>
      <button class="cart-menu-toggle-close">
        <j-symbol class="cart-menu-toggle-icon" name="cancel"></j-symbol>
      </button>
    </div>

    <div class="cart-items">
      <!-- Cart Items -->
      <slot></slot>
    </div>
    <div class="cart-display-footer">
      <div class="subtotal-container">
        <div class="total-cost">
          <div class="subtotal-label">Cart Subtotal</div>
          <span class="total-cost-value">$0.00</span>
        </div>
      </div>
      <a
        class="btn-checkout"
        href="checkout.html"
      >
        Checkout
        <j-symbol class="checkout-icon" name="shopping-bag-check"></j-symbol>
      </a>
    </div>
  </div>
`;

class storeCart extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_storeCart.content.cloneNode(true);
    shadow.append(clone);

    this.cartMenuCloseButton = this.shadowRoot.querySelector(
      '.cart-menu-toggle-close'
    );

    this.cartItems = shadow.querySelector('.cart-items');
    this.subtotalLabel = shadow.querySelector('.total-cost-value');
  }

  addCartItem = (cartItem) => {
    this.cartItems.insertAdjacentHTML('afterbegin', cartItem);
  };

  removeCartItem = (productId, optionId) => {
    let targetItem = this.cartItems.querySelector(
      `#cart-item-${productId + optionId}`
    );
    this.cartItems.removeChild(targetItem);
  };

  updateSubtotal = (subTotal) => {
    this.subtotalLabel.textContent = formatCurrency(subTotal);
  };

  connectedCallback() {
    this.cartMenuCloseButton.addEventListener('click', handleCloseCartMenu);

    const cartItemsSlot = this.shadowRoot.querySelector('.cart-items slot');

    cartItemsSlot.addEventListener('slotchange', () => {
      const assignedNodes = cartItemsSlot.assignedNodes();

      const cartItems = this.shadowRoot.querySelector('.cart-items');
      assignedNodes.forEach((node) => {
        cartItems.appendChild(node);
      });
    });
  }
}

window.customElements.define('store-cart', storeCart);
