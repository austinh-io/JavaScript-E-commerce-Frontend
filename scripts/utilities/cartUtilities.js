'use strict';

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
