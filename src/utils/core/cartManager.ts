import { CartItem } from '../../models/cartItem';
import { ProductGroup } from '../../models/productGroup';
import { ProductVariant } from '../../models/productVariant';
import { Catalog } from './catalogManager';

export class Cart {
  private static _CartItems: { [key: string]: CartItem } = {};

  static addItem(itemGroup: ProductGroup, itemVariant: ProductVariant) {
    const itemKey = this.getItemKey(itemGroup.id, itemVariant.id);
    if (this.hasItem(itemKey)) {
      this.getItem(itemKey).incrementCount();
    } else {
      const newCartItem = new CartItem(itemGroup, itemVariant);
      this._CartItems[newCartItem.id] = newCartItem;
    }
  }

  static removeItem(itemGroup: ProductGroup, itemVariant: ProductVariant) {
    const itemKey = this.getItemKey(itemGroup.id, itemVariant.id);
    if (this.hasItem(itemKey)) {
      delete this._CartItems[itemKey];
    } else {
      console.error('Item does not exist in cart!');
    }
  }

  static getItem(cartItemId: string): CartItem {
    return this._CartItems[cartItemId];
  }

  static getAllItems(): { [key: string]: CartItem } {
    return this._CartItems;
  }

  static hasItem(itemKey: string): boolean {
    return itemKey in this._CartItems;
  }

  static getItemKey(itemGroupId: string, itemVariantId: string) {
    return String(itemGroupId) + String(itemVariantId);
  }
}

window.addEventListener('addToCart', (event: Event) => {
  if (event instanceof CustomEvent && event.detail) {
    const { productGroupId, productVariantId } = event.detail;
    const productToAdd = Catalog.getGroup(productGroupId);
    const variantToAdd = Catalog.getVariant(productGroupId, productVariantId);
    Cart.addItem(productToAdd, variantToAdd);
  }
});
