import {
  findItem,
  formatCurrency,
  catchProductList,
  catalogProducts,
} from '/scripts/utilities/commerceUtilities.js';

import { initializeProducts } from './catalog.js';
('use strict');

const productTitleElement = document.querySelector('.product-title');
const productBrandElement = document.querySelector('.product-brand');
const productDescriptionElement = document.querySelector(
  '.product-description'
);
const productSizeElement = document.querySelector('.product-size');
const productStyleElement = document.querySelector('.product-style');
const productPriceElement = document.querySelector('.product-price');
const productImageElement = document.querySelector('.product-image');

const baseUrl = '';

/**
 * Fetches the product list from the server and stores it in the `products` array.
 * @returns {Promise<void>} A Promise that resolves when the product list has been fetched and stored.
 */

/**
 * Initializes the product page by fetching the product list, retrieving the product and option IDs from the URL, and updating the page with the product information.
 * @returns {Promise<void>}
 */
async function initializePage() {
  await initializeProducts();

  const productId = new URLSearchParams(window.location.search).get(
    'productid'
  );

  const optionId = new URLSearchParams(window.location.search).get('optionid');

  const product = catalogProducts.find((i) => i.productId == productId);

  const productOption = product.options.find((i) => i.optionId == optionId);

  productTitleElement.innerText = product.title;
  productBrandElement.innerText = product.brand;
  productDescriptionElement.innerText = product.description;
  productSizeElement.innerText = productOption.optionSize;
  productStyleElement.innerText = productOption.optionStyle;
  productPriceElement.innerText = productOption.price;
  productImageElement.src = `${baseUrl}/assets/images/productImages/small/${productOption.imageName}_small.webp`;
}

document.addEventListener('DOMContentLoaded', initializePage);
