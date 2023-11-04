import {
  formatCurrency,
  findItem,
  baseUrl,
} from '/scripts/utilities/commerceUtilities.js';

import {
  addToCart,
  cartItems,
  removeFromCart,
  subtractFromCart,
} from '../utilities/cartUtilities.js';

('use strict');

const tpl_cartitemCard = document.createElement('template');

/**
 * CSS template string for the product card component.
 * @type {string}
 */
const tpl_cartItemCardCSS = `
<style>
    @import url(${baseUrl}/css/main.css);

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
    
    .cart-item-option-label, .cart-item-style-label {
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
      aspect-ratio: 1/1;

      margin: 0.2rem;
      padding: 0;

    
      width: 100%;
      max-width: 12rem;
    
      border: none;
      border-radius: 2pt;
      cursor: pointer;
    
      background: none;
    
      z-index: 995;
    }
    
    .button-cart:hover {
      background-color: var(--color-font);

      .button-cart-icon svg{
        stroke: var(--color-fg);
      }
    }

    .button-cart-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .button-cart.button-remove {
      width: 2rem;
      height: 2rem;
      border: none;
      background: none;
      border-radius: 3pt;
    }

    .button-cart.button-remove svg {
      stroke: var(--color-font);
      width: 1.6rem;
      height: 1.6rem;
    }

    .button-cart.button-remove j-symbol :hover {
      stroke: var(--color-warning);
    }
    
    .button-cart.button-remove svg{
      stroke: var(--color-font);
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
        <j-symbol class="button-cart-icon" name="add"></j-symbol>
        </button>

        <div class="cart-item-count"></div>

        <button
          class="button-cart button-subtract"
        >
        <j-symbol class="button-cart-icon" name="minus"></j-symbol>
        </button>
      </div>
    </div>
    <div class="cart-item-col3">
      <button
        class="button-cart button-remove"
      >
        <j-symbol name="trash-can"></j-symbol>
      </button>

      <div class="cart-item-price">
        <span class="cart-item-price-value"></span>
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

    const cartItem = findItem(cartItems, this.productId, this.optionId);

    this.image = shadow.querySelector('.cart-item-image');
    this.image.src = `/assets/images/productImages/small/${cartItem.option.imageSet[0]}_small.webp`;

    this.titleLabel = shadow.querySelector('.cart-item-title');
    this.titleLabel.textContent = cartItem.title;

    this.styleLabel = shadow.querySelector('.cart-item-style-label');
    this.styleLabel.textContent = `${cartItem.option.attributes[0].name}: ${cartItem.option.attributes[0].value}`;

    this.optionLabel = shadow.querySelector('.cart-item-option-label');
    this.optionLabel.textContent = `${cartItem.option.attributes[2].name}: ${cartItem.option.attributes[2].value}`;

    this.addButton = shadow.querySelector('.button-cart.button-add');
    this.addButton.dataset.productid = this.productId;
    this.addButton.dataset.optionid = this.optionId;

    this.itemCount = shadow.querySelector('.cart-item-count');
    this.itemCount.textContent = cartItem.count;

    this.subtractButton = shadow.querySelector('.button-cart.button-subtract');
    this.subtractButton.dataset.productid = this.productId;
    this.subtractButton.dataset.optionid = this.optionId;

    this.removeButton = shadow.querySelector('.button-cart.button-remove');
    this.removeButton.dataset.productid = this.productId;
    this.removeButton.dataset.optionid = this.optionId;

    this.price = shadow.querySelector('.cart-item-price-value');
    this.price.textContent = formatCurrency(cartItem.totalPrice);
  }

  updateItemCountLabel = () => {
    if (findItem(cartItems, this.productId, this.optionId))
      this.itemCount.textContent = findItem(
        cartItems,
        this.productId,
        this.optionId
      ).count;
  };

  updateItemTotalPrice = () => {
    if (findItem(cartItems, this.productId, this.optionId))
      this.price.textContent = formatCurrency(
        findItem(cartItems, this.productId, this.optionId).totalPrice
      );
  };

  connectedCallback() {
    this.addButton.addEventListener('click', addToCart);
    this.addButton.addEventListener('click', this.updateItemCountLabel);
    this.addButton.addEventListener('click', this.updateItemTotalPrice);
    this.subtractButton.addEventListener('click', subtractFromCart);
    this.subtractButton.addEventListener('click', this.updateItemCountLabel);
    this.subtractButton.addEventListener('click', this.updateItemTotalPrice);
    this.removeButton.addEventListener('click', removeFromCart);
  }
}

window.customElements.define('cart-item', cartItem);
