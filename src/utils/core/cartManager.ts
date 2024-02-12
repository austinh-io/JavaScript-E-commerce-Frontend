import { CartItem } from '../../models/product';

export class CartManager {
  private static _items: { [key: string]: CartItem } = {};

  static addItem(item: CartItem) {
    this._items[item.itemId] = item;
  }

  static removeItem(itemId: string) {
    delete this._items[itemId];
  }

  static getItem(itemId: string): CartItem {
    return this._items[itemId];
  }

  static getAllItems(): { [key: string]: CartItem } {
    return this._items;
  }

  static setTestingItems() {
    this.addItem(new CartItem('0', 'Item 0', 'A nice item!', 4.99));
    this.addItem(new CartItem('1', 'Item 1', 'A nice item!', 6.9));
    this.addItem(new CartItem('2', 'Item 2', 'A nice item!', 2.49));
    this.addItem(new CartItem('3', 'Item 3', 'A nice item!', 17.99));
  }
}

CartManager.setTestingItems();
