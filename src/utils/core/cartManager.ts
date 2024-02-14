import { CartItem } from '../../models/cartItem';
import { ProductGroup } from '../../models/productGroup';
import { ProductVariant } from '../../models/productVariant';
import { Catalog } from './catalogManager';

export class Cart {
  private static _items: { [key: string]: CartItem } = {};

  static addItem(itemGroup: ProductGroup, itemVariant: ProductVariant) {
    const newCartItem = new CartItem(itemGroup, itemVariant);
    this._items[newCartItem.id] = newCartItem;
  }

  static removeItem(itemGroup: ProductGroup, itemVariant: ProductVariant) {
    if (this.hasItem(itemGroup, itemVariant)) {
      delete this._items[this.getItemKey(itemGroup, itemVariant)];
    }
  }

  static getItem(productId: string): CartItem {
    return this._items[productId];
  }

  static getAllItems(): { [key: string]: CartItem } {
    return this._items;
  }

  static hasItem(
    itemGroup: ProductGroup,
    itemVariant: ProductVariant
  ): boolean {
    return this.getItemKey(itemGroup, itemVariant) in this._items;
  }

  static getItemKey(itemGroup: ProductGroup, itemVariant: ProductVariant) {
    return String(itemGroup.id) + String(itemVariant.id);
  }
}

window.addEventListener('addToCart', (event: Event) => {
  if (event instanceof CustomEvent && event.detail) {
    const { productGroupId } = event.detail;
    const { productVariantId } = event.detail;
    const productToAdd = Catalog.getGroup(productGroupId);
    const variantToAdd = Catalog.getVariant(productGroupId, productVariantId);
    Cart.addItem(productToAdd, variantToAdd);
  }
});
