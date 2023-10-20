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
  updateCatalogItemsCartButtons,
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
  await catchProductList();
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

  cartItems.forEach((cartListItem) => {
    checkoutCartList.insertAdjacentHTML(
      'afterbegin',
      cartItemTemplate(cartListItem)
    );
  });
}

async function initializePage() {
  await initializeProducts();
  getCartLocalStorage();
}

document.addEventListener('DOMContentLoaded', initializePage);
