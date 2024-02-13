import { ProductVariant } from './productVariant';

export class ProductGroup {
  private _productId: string = '0';
  private _productName: string = '';
  private _productDescription: string = '';
  private _productPrice: number = 0.0;
  private _productVariants: { [key: string]: ProductVariant } = {};

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    variants: { [key: string]: ProductVariant }
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.variants = variants;
  }

  get id(): string {
    return this._productId;
  }

  set id(value: string) {
    this._productId = value;
  }

  get name(): string {
    return this._productName;
  }

  set name(value: string) {
    this._productName = value;
  }

  get description(): string {
    return this._productDescription;
  }

  set description(value: string) {
    this._productDescription = value;
  }

  get price(): number {
    return this._productPrice;
  }

  set price(value: number) {
    this._productPrice = value;
  }

  get variants(): { [key: string]: ProductVariant } {
    return this._productVariants;
  }

  set variants(value: { [key: string]: ProductVariant }) {
    this._productVariants = value;
  }

  addVariant(value: ProductVariant) {
    this._productVariants[value.id] = value;
  }

  removeVariant(key: string) {
    if (this.hasVariant(key)) {
      delete this._productVariants[key];
    }
  }

  hasVariant(key: string): boolean {
    return key in this._productVariants;
  }
}
