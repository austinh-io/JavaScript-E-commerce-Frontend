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
  cartItemsList,
} from '../utilities/cartUtilities.js';

import { openCartMenu } from '../menus.js';

('use strict');

const tpl_cartitemCard = document.createElement('template');

/**
 * CSS template string for the product card component.
 * @type {string}
 */
const tpl_cartItemCardCSS = `
<style>
    @import url(${baseUrl}/css/shared.css);
    @import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200);
    @import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200);

    :host {
      /*Uncomment the height below if you want all cards to be the same height, as they currently
      can be shorter or taller if they have more or less options. Right now the image will grow as the
      card grows, so if that bothers you then turn this on.*/

      /*height: 100%;*/
      width: 100%;
    }

    .cart-item-container {
      display: flex;
      flex-shrink: 0;
      gap: 1rem;
    
      background-color: var(--color-fg);
      border-radius: 3pt;
    
      padding: 0.6rem;
    
      transition: all 0.2s ease;
    
      z-index: 9100;
    }
    
    /*** Col1 ***/
    
    .cart-item-title {
      text-transform: uppercase;
      font-weight: 600;
    }
    
    .cart-item-option-label {
      text-transform: capitalize;
      font-weight: 300;
    }
    
    .cart-item-col1 {
      aspect-ratio: 1/1;
      overflow: hidden;
      border-radius: 3pt;
      max-width: 33%;
    }
    
    .cart-item-col1 img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    
    /*** Col2 ***/
    
    .cart-item-col2 {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: space-between;
    }
    
    .cart-item-count {
      display: flex;
      align-items: center;
      justify-content: center;
    
      min-width: 1.6rem;
    }
    
    /* Buttons */
    
    .cart-item-buttons-container {
      display: flex;
      align-items: center;
      justify-content: center;
    
      gap: 0.2rem;
      border: 2px solid var(--color-font);
      overflow: hidden;
      border-radius: 3pt;
    
      z-index: 990;
    }
    
    .button-cart {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0.2rem;
      padding: 0;
    
      width: 100%;
      max-width: 12rem;
    
      border: none;
      cursor: pointer;
    
      background: none;
    
      color: var(--color-font);
    
      z-index: 995;
    }
    
    .button-cart :hover {
      color: var(--color-fg);
      background-color: var(--color-font);
    }
    
    .button-cart.button-remove {
      width: 2rem;
      height: 2rem;
      border: none;
      background: none;
      color: var(--color-font);
    }
    
    .button-cart.button-remove :hover {
      background: none;
      color: var(--color-accent);
    }
    
    .material-symbols-outlined.button-cart-icon {
      font-size: 2rem;
      border-radius: 3pt;
    }
    
    /*** Col3 ***/
    
    .cart-item-col3 {
      display: flex;
      flex-direction: column;
      align-items: end;
      justify-content: space-between;
    
      margin-left: auto;
    
      max-width: 20%;
    }

</style>
`;

tpl_cartitemCard.innerHTML = `
${tpl_cartItemCardCSS}

  <div
    class="cart-item-container"
  >
    <div class="cart-item-col1">
      <img
        class="cart-item-image"
      />
    </div>
    <div class="cart-item-col2">
      <div class="cart-item-title"></div>
      <div class="cart-item-style-label"></div>
      <div class="cart-item-option-label"></div>

      <div
        class="cart-item-buttons-container"
      >
        <button
          class="button-cart button-add"
        >
        <span class="material-symbols-outlined button-cart-icon">
        add
        </span>
        </button>

        <div class="cart-item-count"></div>

        <button
          class="button-cart button-subtract"
        >
        <span class="material-symbols-outlined button-cart-icon">
        remove
        </span>
        </button>
      </div>
    </div>
    <div class="cart-item-col3">
      <button
        class="button-cart button-remove"
      >
        <span class="material-symbols-outlined"> delete </span>
      </button>

      <div class="cart-item-price">
        <span></span>
      </div>
    </div>
  </div>
`;

class cartItem extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_cartitemCard.content.cloneNode(true);
    shadow.append(clone);

    this.productId = this.dataset.productid;
    this.optionId = this.dataset.optionid;
    this.id = `cart-item-${this.productId + this.optionId}`;

    this.image = shadow.querySelector('.cart-item-image');
    this.image.src = `/assets/images/productImages/small/item0-0_small.webp`;

    this.titleLabel = shadow.querySelector('.cart-item-title');
    this.titleLabel.textContent = 'Title';

    this.styleLabel = shadow.querySelector('.cart-item-style-label');
    this.styleLabel.textContent = 'Style: Style label';

    this.optionLabel = shadow.querySelector('.cart-item-option-label');
    this.optionLabel.textContent = 'Style: Option label';

    this.addButton = shadow.querySelector('.button-cart.button-add');
    this.addButton.dataset.productid = this.productId;
    this.addButton.dataset.optionid = this.optionId;

    this.itemCount = shadow.querySelector('.cart-item-count');
    this.itemCount.textContent = '0';

    this.subtractButton = shadow.querySelector('.button-cart.button-subtract');
    this.subtractButton.dataset.productId = this.productId;
    this.subtractButton.dataset.optionId = this.optionId;

    this.price = shadow.querySelector('.cart-item-price');
    this.price.textContent = formatCurrency(0);
  }
}

window.customElements.define('cart-item', cartItem);
