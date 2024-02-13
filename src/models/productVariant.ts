export class ProductVariant {
  private _variantId: string = '0';
  private _variantNameOverride: string | null = null;
  private _variantDescriptionOverride: string | null = null;
  private _variantPriceOverride: number | null = null;

  constructor(id: string, name?: string, description?: string, price?: number) {
    this.id = id;
    if (name) this.nameOverride = name;
    if (description) this.descriptionOverride = description;
    if (price) this.priceOverride = price;
  }

  get id(): string {
    return this._variantId;
  }

  set id(value: string) {
    this._variantId = value;
  }

  get nameOverride(): string | null {
    return this._variantNameOverride;
  }

  set nameOverride(value: string) {
    this._variantNameOverride = value;
  }

  get descriptionOverride(): string | null {
    return this._variantDescriptionOverride;
  }

  set descriptionOverride(value: string) {
    this._variantDescriptionOverride = value;
  }

  get priceOverride(): number | null {
    return this._variantPriceOverride;
  }

  set priceOverride(value: number) {
    this._variantPriceOverride = value;
  }
}
