export class Product {
  private _itemId: string = '0';
  private _itemName: string = '';
  private _itemDescription: string = '';
  private _itemPrice: number = 0.0;

  constructor(id: string, name: string, description: string, price: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  get id(): string {
    return this._itemId;
  }

  set id(value: string) {
    this._itemId = value;
  }

  get name(): string {
    return this._itemName;
  }

  set name(value: string) {
    this._itemName = value;
  }

  get description(): string {
    return this._itemDescription;
  }

  set description(value: string) {
    this._itemDescription = value;
  }

  get price(): number {
    return this._itemPrice;
  }

  set price(value: number) {
    this._itemPrice = value;
  }
}
