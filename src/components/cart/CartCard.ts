import { CartItem } from '../../models/product';
import { CartManager } from '../../utils/core/cartManager';

const TPL_CartCard = document.createElement('template');

const TPL_CartCard_css = /* CSS */ `
<style>

    :host {
        overflow: hidden;
        border-radius: 4px;

    }
    .container {
        position: relative;

        width: 100%;
        height: 5rem;

        padding: 1.2rem;
    }

    .container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.4;
        background: var(--color-surface-400);
    }

    .cart-card-image-container {
        width: 4rem;
        height: 4rem;
        background: var(--color-tertiary-500);
        opacity: 0.5;
    }

    h1, h2, h3, h4, h5, h6, p {
        margin: 0;
        padding: 0;
    }

    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
        gap: 1rem;
        align-items: center;
        justify-content: center;
    }

    .grid-item {

    }
</style>
`;

TPL_CartCard.innerHTML = /* HTML */ `
  ${TPL_CartCard_css}

  <div class="container grid-container">
    <div class="grid-item">
      <div class="cart-card-image-container"></div>
    </div>
    <div class="grid-item">
      <h4 id="title">Cart Item</h4>
      <p id="description">Lorem Ipsum</p>
      <p id="price">$0.00</p>
    </div>
    <div class="grid-item">
      <app-button
        iconType="solid"
        iconName="trash"
        size="sm"
        id="btn-remove"></app-button>
    </div>
  </div>
`;

class CartCard extends HTMLElement {
  private _cartItem: CartItem;
  private _itemTitleLabel: HTMLElement;
  private _itemDescriptionLabel: HTMLElement;
  private _itemPriceLabel: HTMLElement;
  private _removeButton: HTMLElement;

  constructor(cartItem: CartItem) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_CartCard.content.cloneNode(true);
    shadow.append(clone);

    this._itemTitleLabel = shadow.querySelector('#title')!;
    this._itemDescriptionLabel = shadow.querySelector('#description')!;
    this._itemPriceLabel = shadow.querySelector('#price')!;
    this._removeButton = shadow.querySelector('#btn-remove')!;

    this._cartItem = cartItem;
    this.itemId = String(cartItem.itemId);
    this.itemName = cartItem.itemName;
    this.itemDescription = cartItem.itemDescription;
    this.itemPrice = cartItem.itemPrice;

    this._itemTitleLabel.innerText = this.itemName;
    this._itemDescriptionLabel.innerText = this.itemDescription;
    this._itemPriceLabel.innerText = this.itemPrice;
  }

  get cartItem(): CartItem | null {
    return this._cartItem;
  }

  set cartItem(value: CartItem) {
    this._cartItem = value;
    this.itemId = value.itemId;
    this.updateItemLabels();
  }

  get itemId(): string | null {
    return this.getAttribute('itemId');
  }

  set itemId(value: string | number) {
    this.setAttribute('itemId', String(value));
  }

  get itemName(): string | null {
    return this.getAttribute('itemName');
  }

  set itemName(value: string) {
    this.setAttribute('itemName', value);
  }

  get itemDescription(): string | null {
    return this.getAttribute('itemDescription');
  }

  set itemDescription(value: string) {
    this.setAttribute('itemDescription', value);
  }

  get itemPrice(): string {
    return this.getAttribute('itemPrice')!;
  }

  set itemPrice(value: number) {
    this.setAttribute('itemPrice', String(value));
  }

  connectedCallback() {
    this._removeButton.addEventListener('click', () => this.removeItem());
  }

  updateItemLabels() {
    this._itemTitleLabel.innerText = this.itemName!;
    this._itemDescriptionLabel.innerText = this.itemDescription!;
    this._itemPriceLabel.innerText = this.itemPrice!;
  }

  removeItem() {
    CartManager.removeItem(this._cartItem.itemId);
    this.remove();
  }
}

window.customElements.define('cart-card', CartCard);

export default CartCard;
