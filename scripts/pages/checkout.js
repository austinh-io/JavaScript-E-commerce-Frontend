import {
  formatCurrency,
  catalogProducts,
} from '/scripts/utilities/commerceUtilities.js';
import { initializeProducts } from '/scripts/pages/catalog.js';
import { cartItems } from '../utilities/cartUtilities.js';

('use strict');

const checkoutCartList = document.querySelector('.checkout-cart-items');

const cartItemTemplate = function (item) {
  return `
          <div
            class="cart-item-container"
            data-productId="${item.productId}"
            data-optionid="${item.option.optionId}"
            id="cart-item-${item.productId + item.option.optionId}"
          >
            <div class="cart-item-col1">
              <img
                src="/assets/images/productImages/small/${
                  item.option.imageName
                }_small.webp/"
                class="cart-item-image"
              />
            </div>
            <div class="cart-item-col2">
              <div class="cart-item-title">${item.title}</div>
              <div class="cart-item-option-label">Style: ${
                item.option.optionStyle
              }</div>
              <div class="cart-item-option-label">Size: ${
                item.option.optionSize
              }</div>
  
              <div
                class="cart-item-buttons-container"
              >            
                <div class="cart-item-count">${
                  item.count
                }</div>                 
              </div>
            </div>
            <div class="cart-item-col3">  
              <div class="cart-item-price">
                <span>${formatCurrency(item.totalPrice)}</span>
              </div>
            </div>
          </div>
    `;
};

async function fillCartList() {
  await initializeProducts();
  cartItems.forEach((cartListItem) => {
    checkoutCartList.insertAdjacentHTML(
      'afterbegin',
      cartItemTemplate(cartListItem)
    );
  });
}

document.addEventListener('DOMContentLoaded', fillCartList);
