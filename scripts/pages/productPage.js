import {
  findItem,
  formatCurrency,
  catchProductList,
  catalogProducts,
  baseUrl,
} from '/scripts/utilities/commerceUtilities.js';

import {
  addToCart,
  updateProductPageButton,
} from '../utilities/cartUtilities.js';

import { initializeProducts } from './catalog.js';
('use strict');

import { handleOpenCartMenu } from '../utilities/menus.js';

const productTitleElement = document.querySelector('.product-title');
const productBrandElement = document.querySelector('.product-brand');
const productDescriptionElement = document.querySelector(
  '.product-description'
);
const productSizeElement = document.querySelector('.product-size');
const productStyleElement = document.querySelector('.selected-style');
const productPriceElement = document.querySelector('.product-price');
const productImageElement = document.querySelector('.product-image');
const addToCartButton = document.querySelector('.btn-add-to-cart');

function initProductImageLayout() {
  const imageOptionsContainer = document.querySelector(
    '.product-image-options'
  );
  const imageOptions = document.querySelectorAll('.image-option');

  if (imageOptions.length < 5)
    imageOptionsContainer.classList.add('few-options');
}

async function initializePage() {
  await initializeProducts();
  initProductImageLayout();

  const productId = new URLSearchParams(window.location.search).get(
    'productid'
  );

  const optionId = new URLSearchParams(window.location.search).get('optionid');

  const product = catalogProducts.find((i) => i.productId == productId);

  const productOption = product.options.find((i) => i.optionId == optionId);

  addToCartButton.setAttribute('data-productid', productId);
  addToCartButton.setAttribute('data-optionid', optionId);

  document.title = `${product.title} | ${product.brand}`;
  productTitleElement.innerText = product.title;
  productBrandElement.innerText = product.brand;
  productDescriptionElement.innerText = product.description;

  //TODO: Below is just a temp fix, find a better way to get every attribute and value
  productSizeElement.innerText = productOption.attributes[0].value;
  productStyleElement.innerText = productOption.attributes[1].value;
  productPriceElement.innerText = productOption.price;
  productImageElement.src = `${baseUrl}/assets/images/productImages/small/${productOption.imageSet[0]}_small.webp`;

  addToCartButton.addEventListener('click', addToCart);
  addToCartButton.addEventListener('click', handleOpenCartMenu);
  updateProductPageButton();
}

document.addEventListener('DOMContentLoaded', initializePage);
