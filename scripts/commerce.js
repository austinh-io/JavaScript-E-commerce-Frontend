import {
  formatCurrency,
  findItem,
  baseUrl,
  catchProductList,
  catalogProducts,
} from './utilities/commerceUtilities.js';
import {
  cartItem,
  cartItems,
  setCartItems,
  removeFromCart,
  updateCartItemsCount,
  updateCart,
  updateCartSubtotal,
  updateCartItem,
  addCartItem,
  clearCartItem,
  clearCartList,
  fillCartList,
  setCartLocalStorage,
  getCartLocalStorage,
  cartItemTemplate,
} from './utilities/cartUtilities.js';
('use strict');

let productsList = undefined;

async function initializeProducts() {
  productsList = document.querySelector('.products-list');

  if (productsList) {
    for (const productObject of catalogProducts) {
      productsList.insertAdjacentHTML(
        'beforeend',
        `<catalog-product
          productId=${productObject.productId}
        > </catalog-product>`
      );
    }
  }
}

async function initializePage() {
  await catchProductList();
  getCartLocalStorage();
  fillCartList();
  await initializeProducts();
}

document.addEventListener('DOMContentLoaded', initializePage);
