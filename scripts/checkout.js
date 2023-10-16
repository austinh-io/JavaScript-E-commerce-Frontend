'use strict';

const checkoutCartList = document.querySelector('.checkout-cart-items');

let cartItems = new Array();

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
                
  
                <div class="cart-item-count">${item.count}</div>
  
                
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

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function getCartLocalStorage() {
  let localCartItems = localStorage.getItem('localCart');
  cartItems = JSON.parse(localCartItems);
}

function fillCartList() {
  cartItems.forEach((cartListItem) => {
    checkoutCartList.insertAdjacentHTML(
      'afterbegin',
      cartItemTemplate(cartListItem)
    );
  });
}

async function initializePage() {
  getCartLocalStorage();
  fillCartList();
}

document.addEventListener('DOMContentLoaded', initializePage);
