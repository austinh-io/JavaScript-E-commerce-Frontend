import { ProductVariant } from './productVariant';

export class CartItem {
  private _count: number = 1;
  private _productVariant: ProductVariant;

  constructor(count: number, productVariant: ProductVariant) {
    this._count = count;
    this._productVariant = productVariant;
  }

  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
  }

  get productVariant(): ProductVariant {
    return this._productVariant;
  }

  set productVariant(value: ProductVariant) {
    this._productVariant = value;
  }
}
