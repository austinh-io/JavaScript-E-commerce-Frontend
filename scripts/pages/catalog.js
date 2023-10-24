import {
  catchProductList,
  catalogProducts,
} from '../utilities/commerceUtilities.js';
import {
  fillCartList,
  getCartLocalStorage,
  cartItems,
} from '../utilities/cartUtilities.js';
('use strict');

let productsList = undefined;

/**
 * Initializes the products list by inserting catalog-product elements for each product in the catalog.
 * @async
 * @function initializeProducts
 * @returns {Promise<void>}
 */
async function initializeCatalog() {
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

export async function initializeProducts() {
  await catchProductList();
  getCartLocalStorage();
  fillCartList();
  await initializeCatalog();
}

// Add an event listener to initialize the page when the DOM is loaded.
document.addEventListener('DOMContentLoaded', initializeProducts);
