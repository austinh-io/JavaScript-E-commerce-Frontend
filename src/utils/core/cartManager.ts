import { Product } from '../../models/product';

export class Cart {
  private static _items: { [key: string]: Product } = {};

  static addItem(item: Product) {
    this._items[item.id] = item;
  }

  static removeItem(productId: string) {
    delete this._items[productId];
  }

  static getItem(productId: string): Product {
    return this._items[productId];
  }

  static getAllItems(): { [key: string]: Product } {
    return this._items;
  }

  static setTestingItems() {
    this.addItem(new Product('0', 'Item 0', 'A nice item!', 4.99));
    this.addItem(new Product('1', 'Item 1', 'A nice item!', 6.9));
    this.addItem(new Product('2', 'Item 2', 'A nice item!', 2.49));
    this.addItem(new Product('3', 'Item 3', 'A nice item!', 17.99));
  }
}

Cart.setTestingItems();
