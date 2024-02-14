import { ProductGroup } from './productGroup';
import { ProductVariant } from './productVariant';

export class CartItem {
  private _count: number = 1;
  private _productGroup: ProductGroup;
  private _productVariant: ProductVariant;
  private _cartId: string;

  constructor(
    productGroup: ProductGroup,
    productVariant: ProductVariant,
    count?: number
  ) {
    this._productGroup = productGroup;
    this._productVariant = productVariant;
    if (count) this._count = count;
    this._cartId = String(productGroup.id) + String(productVariant.id);
  }

  get id(): string {
    return this._cartId;
  }

  set id(value: string) {
    this._cartId = value;
  }

  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
  }

  incrementCount() {
    this._count++;
  }

  decrementCount() {
    this._count--;
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
    this.productVariant = this._productGroup.variants[0];
  }

  get productVariant(): ProductVariant {
    return this._productVariant;
  }

  set productVariant(value: ProductVariant) {
    if (this.groupHasVariant(value.id)) this._productVariant = value;
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

  get groupPrice(): number {
    return this.productGroup.price;
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

  get variantPrice(): number | null {
    return this.productVariant.priceOverride;
  }

  groupHasVariant(key: string): boolean {
    return key in this._productGroup.variants;
  }
}
