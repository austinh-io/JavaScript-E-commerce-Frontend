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
  setCatalogProductButtons,
} from './utilities/cartUtilities.js';
('use strict');

let productsList = undefined;

/**
 * Initializes the products list by inserting catalog-product elements for each product in the catalog.
 * @async
 * @function initializeProducts
 * @returns {Promise<void>}
 */
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

/**
 * Initializes the page by fetching the product list, getting the cart from local storage,
 * filling the cart list, initializing the products, and setting the catalog product buttons.
 * @returns {Promise<void>}
 */
async function initializePage() {
  await catchProductList();
  getCartLocalStorage();
  fillCartList();
  await initializeProducts();
  await setCatalogProductButtons();
}

// Add an event listener to initialize the page when the DOM is loaded.
document.addEventListener('DOMContentLoaded', initializePage);
