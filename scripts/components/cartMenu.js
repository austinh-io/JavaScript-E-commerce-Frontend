import {
  formatCurrency,
  baseUrl,
} from '/scripts/utilities/commerceUtilities.js';

import { handleCloseCartMenu } from '../utilities/menus.js';

('use strict');

const tpl_storeCart = document.createElement('template');

const tpl_storeCartMobileCSS = `
@media screen and (max-width: 768px) {
  :host {
    width: 85vw;
  }

  div#cart-menu {
    width: 85vw;
  }

  div.empty-cart-message {
    text-align: center;
    font-size: 1.6rem;
  }
}
`;

const tpl_storeCartCSS = `
<style>
    @import url(${baseUrl}/css/main.css);

    ${tpl_storeCartMobileCSS}

    :host {
      /*Uncomment the height below if you want all cards to be the same height, as they currently
      can be shorter or taller if they have more or less options. Right now the image will grow as the
      card grows, so if that bothers you then turn this on.*/

      /*height: 100%;*/
      /*width: 100%;*/

      z-index: 910;
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

      z-index: 1;
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
    
    .cart-items {
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
      display: flex;
      align-items: center;
      justify-content: center;
    
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

    a.btn-checkout svg {
      stroke: var(--color-fg);
      margin-left: 0.6rem;
    }
    
    a.btn-checkout:hover {
      background-color: var(--color-fg);
      color: var(--color-font);
      outline: 5px solid var(--color-accent);
    }

    a.btn-checkout:hover svg {
      stroke: var(--color-font);
    }

    a.btn-checkout.disabled {
      background-color: var(--color-disabled);
      color: var(--color-disabled-text);
      cursor: default;
    }

    a.btn-checkout.disabled svg {
      stroke: var(--color-disabled-text);
    }

    a.btn-checkout.disabled:hover {
      background-color: var(--color-disabled);
      color: var(--color-disabled-text);
      outline: none;
    }

    /* ------- Scrollbar -------*/

    ::-webkit-scrollbar {
      width: 0.2rem;
    }

    ::-webkit-scrollbar-track {
      background-color: var(--color-bg);
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--color-accent);
    }

    /* ------- Overlay -------*/
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--color-bg);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease-out;
    }

    .empty-cart-message {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      gap: 2rem;

      font-size: 2rem;
      color: var(--color-disabled-text);

      height: 100%;
      width: 100%;

      cursor: default;
    }

    .empty-cart-message svg {
      stroke: var(--color-disabled-text);
      width: 6rem;
      height: 6rem;
      stroke-width: 0.08rem;
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

      <div class="empty-cart-message">
        <div><j-symbol name="info-empty"></j-symbol></div>
        <div>Your cart is empty.</div>        
      </div>

    </div>
    <div class="cart-display-footer">
      <div class="subtotal-container">
        <div class="total-cost">
          <div class="subtotal-label">Cart Subtotal</div>
          <span class="total-cost-value">$0.00</span>
        </div>
      </div>
      <a
        class="btn-checkout no-hover-effect "
        href="checkout.html"
      >
        <span class="btn-checkout-label">Checkout</span>
        <span class="btn-checkout-icon">
          <j-symbol class="checkout-icon" name="shopping-bag-check"></j-symbol>
        </span>        
      </a>
    </div>
  </div>

  <div class="overlay"></div>
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
    this.subtotalContainer = shadow.querySelector('.subtotal-container');
    this.subtotalLabel = shadow.querySelector('.total-cost-value');
    this.overlay = shadow.querySelector('.overlay');
    this.checkoutButton = shadow.querySelector('.btn-checkout');
    this.checkoutButtonLabel = shadow.querySelector('.btn-checkout-label');
    this.checkoutButtonIcon = shadow.querySelector('.btn-checkout-icon');
    this.emptyMessage = shadow.querySelector('.empty-cart-message');
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

  preventDefault(event) {
    event.preventDefault();
  }

  disableCheckoutButton() {
    this.checkoutButtonLabel.textContent = 'Close';
    this.checkoutButtonIcon.innerHTML = '';
    this.checkoutButton.addEventListener('click', handleCloseCartMenu);
    this.checkoutButton.addEventListener('click', this.preventDefault);
    this.emptyMessage.classList.remove('hidden');
    this.subtotalContainer.classList.add('hidden');
  }

  enableCheckoutButton() {
    this.checkoutButtonLabel.textContent = 'Checkout';
    this.checkoutButtonIcon.innerHTML =
      '<j-symbol name="shopping-bag-check"></j-symbol>';
    this.checkoutButton.removeEventListener('click', this.preventDefault);
    this.checkoutButton.removeEventListener('click', handleCloseCartMenu);
    this.emptyMessage.classList.add('hidden');
    this.subtotalContainer.classList.remove('hidden');
  }

  connectedCallback() {
    this.cartMenuCloseButton.addEventListener('click', handleCloseCartMenu);
    this.overlay.addEventListener('click', handleCloseCartMenu);

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
