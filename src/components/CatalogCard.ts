import { Product } from '../models/product';
import { Cart } from '../utils/core/cartManager';

const TPL_CatalogCard = document.createElement('template');

const TPL_CatalogCard_css = /* CSS */ `
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

TPL_CatalogCard.innerHTML = /* HTML */ `
  ${TPL_CatalogCard_css}

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
      <app-button
        iconType="solid"
        iconName="cart-add"
        size="sm"
        id="btn-add"></app-button>
    </div>
  </div>
`;

class CatalogCard extends HTMLElement {
  private _catalogItem: Product;
  private _itemTitleLabel: HTMLElement;
  private _itemDescriptionLabel: HTMLElement;
  private _itemPriceLabel: HTMLElement;
  private _removeButton: HTMLElement;
  private _addButton: HTMLElement;

  constructor(cartItem: Product) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_CatalogCard.content.cloneNode(true);
    shadow.append(clone);

    this._itemTitleLabel = shadow.querySelector('#title')!;
    this._itemDescriptionLabel = shadow.querySelector('#description')!;
    this._itemPriceLabel = shadow.querySelector('#price')!;
    this._removeButton = shadow.querySelector('#btn-remove')!;
    this._addButton = shadow.querySelector('#btn-add')!;

    this._catalogItem = cartItem;
    this.itemId = String(cartItem.id);
    this.itemName = cartItem.name;
    this.itemDescription = cartItem.description;
    this.itemPrice = cartItem.price;

    this._itemTitleLabel.innerText = this.itemName;
    this._itemDescriptionLabel.innerText = this.itemDescription;
    this._itemPriceLabel.innerText = this.itemPrice;
  }

  get cartItem(): Product | null {
    return this._catalogItem;
  }

  set cartItem(value: Product) {
    this._catalogItem = value;
    this.itemId = value.id;
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
    this._addButton.addEventListener('click', () => this.addToCart());
  }

  updateItemLabels() {
    this._itemTitleLabel.innerText = this.itemName!;
    this._itemDescriptionLabel.innerText = this.itemDescription!;
    this._itemPriceLabel.innerText = this.itemPrice!;
  }

  removeItem() {
    Cart.removeItem(this._catalogItem.id);
  }

  addToCart() {
    this.dispatchEvent(
      new CustomEvent('addToCart', {
        bubbles: true,
        composed: true,
        detail: { itemId: this._catalogItem.id },
      })
    );
  }
}

window.customElements.define('catalog-card', CatalogCard);

export default CatalogCard;
