// TODO: set everything up

export class CartItem {
  private _itemId: string = '0';
  private _itemName: string = '';
  private _itemDescription: string = '';
  private _itemPrice: number = 0.0;

  constructor(
    itemId: string,
    itemName: string,
    itemDescription: string,
    itemPrice: number
  ) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.itemDescription = itemDescription;
    this.itemPrice = itemPrice;
  }

  get itemId(): string {
    return this._itemId;
  }

  set itemId(value: string) {
    this._itemId = value;
  }

  get itemName(): string {
    return this._itemName;
  }

  set itemName(value: string) {
    this._itemName = value;
  }

  get itemDescription(): string {
    return this._itemDescription;
  }

  set itemDescription(value: string) {
    this._itemDescription = value;
  }

  get itemPrice(): number {
    return this._itemPrice;
  }

  set itemPrice(value: number) {
    this._itemPrice = value;
  }
}
