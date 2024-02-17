import { ProductGroup } from './productGroup';
import { ProductVariant } from './productVariant';

export class CartItem {
  private _productGroup: ProductGroup;
  private _productVariant: ProductVariant;
  private _cartId: string = '';
  private _price: number = 0;
  private _count: number = 1;
  private _totalCost: number = 0;

  constructor(
    productGroup: ProductGroup,
    productVariant: ProductVariant,
    count?: number
  ) {
    this._productGroup = productGroup;
    this._productVariant = productVariant;
    this.setCartId(productGroup, productVariant);

    if (this.productVariant.priceOverride) {
      this._price = this.productVariant.priceOverride;
    } else {
      this._price = this.productGroup.price;
    }

    if (count) {
      this._count = count;
    }

    this._totalCost = this._count * this._price;
  }

  get id(): string {
    return this._cartId;
  }

  setCartId(productGroup: ProductGroup, productVariant: ProductVariant) {
    this._cartId = String(productGroup.id) + String(productVariant.id);
  }

  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
    this.updateTotalCost();
  }

  incrementCount() {
    this._count++;
    this.updateTotalCost();
  }

  decrementCount() {
    this._count--;
    this.updateTotalCost();
  }

  get productGroup(): ProductGroup {
    return this._productGroup;
  }

  set productGroup(value: ProductGroup) {
    this._productGroup = value;

    /* Note:
    Just setting the variant to be the first item in the group.
    If this was not set then you could have a group + variant in
    the cart that actually do not belong to each other.
    */
    const [firstValueVariant] = Object.values(value.variants);
    this.productVariant = firstValueVariant;
    this.setCartId(value, firstValueVariant);
  }

  get productVariant(): ProductVariant {
    return this._productVariant;
  }

  set productVariant(value: ProductVariant) {
    if (this.groupHasVariant(value.id)) this._productVariant = value;
    this.setCartId(this._productGroup, this.productVariant);
  }

  get groupId(): string {
    return this.productGroup.id;
  }

  get groupName(): string {
    return this.productGroup.name;
  }

  get groupDescription(): string {
    return this.productGroup.description;
  }

  get price(): number {
    return this._price;
  }

  get totalCost(): number {
    this.updateTotalCost();
    return this._totalCost;
  }

  get variantId(): string {
    return this.productVariant.id;
  }

  get variantName(): string | null {
    return this.productVariant.nameOverride;
  }

  get variantDescription(): string | null {
    return this.productVariant.descriptionOverride;
  }

  groupHasVariant(key: string): boolean {
    return key in this._productGroup.variants;
  }

  updateTotalCost() {
    this._totalCost = this._count * this._price;
  }
}
