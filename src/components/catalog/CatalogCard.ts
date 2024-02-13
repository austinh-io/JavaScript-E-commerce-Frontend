import { ProductGroup } from '../../models/productGroup.ts';
import { Cart } from '../../utils/core/cartManager.ts';
import { DrawerOverlayManager } from '../../utils/ui/drawerOverlayManager.ts';

const TPL_CatalogCard = document.createElement('template');

const TPL_CatalogCard_css = /* CSS */ `
<style>
    :host {
        overflow: hidden;
        border-radius: 4px;
    }

    .container {
        position: relative;

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

    .hidden {
      display: none;
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
        id="btn-remove"
        class="hidden"></app-button>
      <app-button
        iconType="solid"
        iconName="cart-add"
        size="sm"
        id="btn-add"></app-button>
    </div>
  </div>
`;

export default class CatalogCard extends HTMLElement {
  private _catalogItem: ProductGroup;
  private _itemTitleLabel: HTMLElement;
  private _itemDescriptionLabel: HTMLElement;
  private _itemPriceLabel: HTMLElement;
  private _removeButton: HTMLElement;
  private _addButton: HTMLElement;

  constructor(item: ProductGroup) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_CatalogCard.content.cloneNode(true);
    shadow.append(clone);

    this._itemTitleLabel = shadow.querySelector('#title')!;
    this._itemDescriptionLabel = shadow.querySelector('#description')!;
    this._itemPriceLabel = shadow.querySelector('#price')!;
    this._removeButton = shadow.querySelector('#btn-remove')!;
    this._addButton = shadow.querySelector('#btn-add')!;

    this._catalogItem = item;
    this.itemId = String(item.id);
    this.itemName = item.name;
    this.itemDescription = item.description;
    this.itemPrice = item.price;

    this._itemTitleLabel.innerText = this.itemName;
    this._itemDescriptionLabel.innerText = this.itemDescription;
    this._itemPriceLabel.innerText = this.itemPrice;
  }

  get item(): ProductGroup | null {
    return this._catalogItem;
  }

  set item(value: ProductGroup) {
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
    window.dispatchEvent(
      new CustomEvent('addToCart', {
        detail: { productId: this.itemId },
        bubbles: true,
        composed: true,
      })
    );
    DrawerOverlayManager.openDrawer('cartDrawer');
  }

  disconnectedCallback() {
    this._removeButton.removeEventListener('click', () => this.removeItem());
    this._addButton.removeEventListener('click', () => this.addToCart());
  }
}

window.customElements.define('catalog-card', CatalogCard);
