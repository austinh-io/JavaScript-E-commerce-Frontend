import { ProductGroup } from '../../models/productGroup.ts';
import { ProductVariant } from '../../models/productVariant.ts';
import { Cart } from '../../utils/core/cartManager.ts';
import { Catalog } from '../../utils/core/catalogManager.ts';
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

        height: 24rem;
        width: 14rem;

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
        width: 100%;
        height: auto;
        aspect-ratio: 1/1;
        background: var(--color-tertiary-500);
        opacity: 0.5;
    }

    h1, h2, h3, h4, h5, h6, p {
        margin: 0;
        padding: 0;
    }

    .flex-container {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        gap: 1rem;
        align-items: center;
        justify-content: center;
    }

    .container-item {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: center;
      width: 100%;
    }

    .hidden {
      display: none;
    }
</style>
`;

TPL_CatalogCard.innerHTML = /* HTML */ `
  ${TPL_CatalogCard_css}

  <div class="container flex-container">
    <div class="container-item">
      <div class="cart-card-image-container"></div>
    </div>
    <div class="container-item">
      <h4 id="title">Cart Item</h4>
      <p id="description">Lorem Ipsum</p>
      <p id="price">$0.00</p>
    </div>
    <div class="container-item">
      <app-button
        iconType="solid"
        iconName="cart-add"
        size="md"
        fullWidth="true"
        id="btn-add"
        >Add to Cart</app-button
      >
    </div>
  </div>
`;

export default class CatalogCard extends HTMLElement {
  private _productGroup: ProductGroup;
  private _activeVariant: ProductVariant;
  private _itemTitleLabel: HTMLElement;
  private _itemDescriptionLabel: HTMLElement;
  private _itemPriceLabel: HTMLElement;
  private _addButton: HTMLElement;

  constructor(productGroup: ProductGroup) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_CatalogCard.content.cloneNode(true);
    shadow.append(clone);

    this._itemTitleLabel = shadow.querySelector('#title')!;
    this._itemDescriptionLabel = shadow.querySelector('#description')!;
    this._itemPriceLabel = shadow.querySelector('#price')!;
    this._addButton = shadow.querySelector('#btn-add')!;

    this._productGroup = productGroup;
    this._activeVariant = this.getFirstVariant();

    this.itemGroupId = String(productGroup.id);

    if (this._activeVariant.name) this.itemName = this._activeVariant.name;
    else this.itemName = productGroup.name;

    if (this._activeVariant.description)
      this.itemDescription = this._activeVariant.description;
    else this.itemDescription = productGroup.description;

    if (this._activeVariant.price) this.itemPrice = this._activeVariant.price;
    else this.itemPrice = productGroup.price;

    this._itemTitleLabel.innerText = this.itemName;
    this._itemDescriptionLabel.innerText = this.itemDescription;
    this._itemPriceLabel.innerText = this.itemPrice;
  }

  get item(): ProductGroup | null {
    return this._productGroup;
  }

  set item(value: ProductGroup) {
    this._productGroup = value;
    this.itemGroupId = value.id;
    this.updateItemLabels();
  }

  get itemGroupId(): string | null {
    return this.getAttribute('itemId');
  }

  set itemGroupId(value: string | number) {
    this.setAttribute('itemId', String(value));
  }

  get activeVariantId(): string | null {
    if (
      String(this.getAttribute('activeVariantId')) ===
      String(this._activeVariant.id)
    ) {
      return this.getAttribute('activeVariantId');
    } else {
      console.error('Mismatch in variant id! Please investigate!');
      return null;
    }
  }

  set activeVariantId(value: string | number) {
    this.setAttribute('activeVariantId', String(value));
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
    this._addButton.addEventListener('click', () => this.addToCart());
    this.initVariant();
  }

  updateItemLabels() {
    this._itemTitleLabel.innerText = this.itemName!;
    this._itemDescriptionLabel.innerText = this.itemDescription!;
    this._itemPriceLabel.innerText = this.itemPrice!;
  }

  getFirstVariant(): ProductVariant {
    return Object.values(this._productGroup.variants)[0];
  }

  initVariant() {
    this._activeVariant = this.getFirstVariant();
    this.setAttribute('activeVariantId', this._activeVariant.id);
  }

  addToCart() {
    window.dispatchEvent(
      new CustomEvent('addToCart', {
        detail: {
          productGroupId: this.itemGroupId,
          productVariantId: this.activeVariantId,
        },
        bubbles: true,
        composed: true,
      })
    );
    DrawerOverlayManager.openDrawer('cart');
  }

  disconnectedCallback() {
    this._addButton.removeEventListener('click', () => this.addToCart());
  }
}

window.customElements.define('catalog-card', CatalogCard);
