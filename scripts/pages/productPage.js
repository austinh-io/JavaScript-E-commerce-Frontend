import {
  findItem,
  formatCurrency,
  catchProductList,
  catalogProducts,
} from '/scripts/utilities/commerceUtilities.js';

import { baseUrl } from '../utilities/commerceUtilities.js';

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

  productTitleElement.innerText = product.title;
  productBrandElement.innerText = product.brand;
  productDescriptionElement.innerText = product.description;
  productSizeElement.innerText = productOption.optionSize;
  productStyleElement.innerText = productOption.optionStyle;
  productPriceElement.innerText = productOption.price;
  productImageElement.src = `${baseUrl}/assets/images/productImages/small/${productOption.imageName}_small.webp`;
}

document.addEventListener('DOMContentLoaded', initializePage);
