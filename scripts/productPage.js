import {
  findItem,
  formatCurrency,
} from '/scripts/utilities/commerceUtilities.js';
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

let products = new Array();

/**
 * Fetches the product list from the server and stores it in the `products` array.
 * @returns {Promise<void>} A Promise that resolves when the product list has been fetched and stored.
 */
async function catchProductList() {
  const response = await fetch(`${baseUrl}/data/products.json`);
  const productsObj = await response.json();
  products = [...productsObj];
}

/**
 * Initializes the product page by fetching the product list, retrieving the product and option IDs from the URL, and updating the page with the product information.
 * @returns {Promise<void>}
 */
async function initializePage() {
  await catchProductList();

  const productId = new URLSearchParams(window.location.search).get(
    'productId'
  );

  const optionId = new URLSearchParams(window.location.search).get('optionId');
  console.log('Option ID: ' + optionId);

  const product = products.find((i) => i.productId == productId);

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
