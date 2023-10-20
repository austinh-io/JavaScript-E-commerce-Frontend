'use strict';

export let cartItems = new Array();

export function setCartItems(newItems) {
  cartItems = newItems;
}

export class cartItem {
  constructor(id, productId, option, count, totalPrice, title) {
    this.id = id;
    this.productId = productId;
    this.option = option;
    this.count = count;
    this.totalPrice = totalPrice;
    this.title = title;
  }
}
