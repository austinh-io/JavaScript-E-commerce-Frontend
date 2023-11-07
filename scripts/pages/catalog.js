import {
  catchProductList,
  catalogProducts,
} from '/scripts/utilities/commerceUtilities.js';
import {
  fillCartList,
  getCartLocalStorage,
  cartItems,
} from '/scripts/utilities/cartUtilities.js';
('use strict');

let productsList = undefined;

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
  await initializeCatalog();
}

// Add an event listener to initialize the page when the DOM is loaded.
document.addEventListener('DOMContentLoaded', initializeProducts);
