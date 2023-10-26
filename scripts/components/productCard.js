/**
 * This module defines the template for a product card component, which displays information about a product
 * including its image, brand, title, description, and price. It also includes a button to add the product to the cart,
 * and allows the user to select options such as size and color. The component is designed to be used in an ecommerce site.
 * @module productCard
 */
import {
  formatCurrency,
  findItem,
  baseUrl,
  catalogProducts,
} from '/scripts/utilities/commerceUtilities.js';

import { addToCart, cartItems } from '../utilities/cartUtilities.js';

import { handleOpenCartMenu } from '../utilities/menus.js';

('use strict');

const tpl_catalogProductCard = document.createElement('template');

/**
 * CSS template string for the product card component.
 * @type {string}
 */
const tpl_catalogProductCSS = `
<style>
    @import url(${baseUrl}/css/main.css);

    @media (max-width: 768px) {
      div.product {
        max-width: 100%;
      }
    }

    :host {
      /*Uncomment the height below if you want all cards to be the same height, as they currently
      can be shorter or taller if they have more or less options. Right now the image will grow as the
      card grows, so if that bothers you then turn this on.*/

      /*height: 100%;*/
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-title);
    }

    .product {
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: 38rem;
      width: 100%;
      max-width: 30rem;

      border-radius: 3pt;
    }

    .product-image-container {
      overflow: hidden;
      aspect-ratio: 5/3;
      height: 100%;
      width: 100%;

      border-radius: 3pt;

      background-repeat: no-repeat;
      display: block;

      backdrop-filter: blur(10px);
      
      background-size: 100%;
      background-position: center;

      transition: background-size 0.25s ease;
    }

    .product-image-container:hover {
      background-size: 105%;
    }

    img.product-image {
      transition: transform 0.25s ease;
      transform: scale(1.01);

    }

    img.product-image:hover {
      transform: scale(1.06);
    }

    .product-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-info-container {
      display: flex;
      flex-direction: column;
      padding-top: 0.8rem;
      width: 100%;
    }

    .product-brand {
      font-size: 0.8rem;
      font-weight: 300;
      margin-bottom: -0.2rem;
    }

    .product-title {
      position: relative;
      font-size: 1.4rem;
      height: auto;

      text-transform: uppercase;
    }

    div.product-title a {
      position: relative;
      top: 0;
      font-weight: 500;
      color: inherit;
      text-decoration: none;
      transition: all 0.15s ease-out;
    }

    div.product-title a:hover {
      color: var(--color-accent);
      top: -0.2rem;
    }

    .product-description {
      font-size: 0.9rem;
      font-weight: 300;

      margin-block: 0.4rem;

      height: 100%;
    }

    .product-description p {
      display: -webkit-box;

      -webkit-line-clamp: 2;

      -webkit-box-orient: vertical;

      overflow: hidden;
    }

    .product-price {
      font-size: 1.2rem;
      margin-block: 0.6rem;
      font-weight: 200;
    }

    /* ----- Button ----- */

    .product-button-group {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: space-between;
    }

    .button-product {
      padding: 0.6rem;

      width: 100%;
      max-width: 12rem;

      font-size: 0.8rem;
      border: none;
      border-radius: 3pt;
      cursor: pointer;

      background-color: var(--color-font);
      color: var(--color-fg);
      font-weight: 700;
      text-transform: uppercase;

      border: 3px solid var(--color-font);

      transition: all 0.1s ease-in;
    }

    .button-product:hover {
      color: var(--color-font);
      background-color: var(--color-bg);
      border: 3px solid var(--color-accent);
    }

    .button-product:disabled {
      background-color: var(--color-disabled);
      border: 3px solid var(--color-disabled);
      color: var(--color-fg);

      cursor: default;
    }

    .button-product:disabled:hover {
      background-color: var(--color-disabled);
    }

    /* ----- Fieldset ----- */

    fieldset.product-fieldset {
      display: flex;
      align-items: center;
      justify-content: start;

      gap: 1rem;
      margin-block: 1rem;

      padding-inline: 0;

      border: 0;
    }

    .product-fieldset input[type='radio'] {
      appearance: none;
      width: 1.4rem;
      height: 1.4rem;
      outline-offset: 1px;
      border-radius: 50%;
      cursor: pointer;
      border: 1px solid var(--color-font);

      transition: all 0.1s ease-out;
    }

    .product-fieldset input[type='radio']:hover {
      outline: 3px solid var(--color-accent, currentColor);
      border: none;
    }

    .product-fieldset input[type='radio']:checked {
      outline: 3px solid var(--color-font, currentColor);
      border: none;
    }

    .product-fieldset input[type='radio']:checked:hover {
      outline: 3px solid var(--color-font, currentColor);
      cursor: default;
      border: none;
    }

    .product-fieldset input[type='radio']#light {
      --radio-color: rgb(223, 232, 238);
    }

    .product-fieldset input[type='radio']#dark {
      --radio-color: rgb(23, 28, 32);
    }

    /* ----- Select ----- */
    
    .select-wrapper {
      position: relative;
      display: inline-block;
    }

    .select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      color: var(--color-font);
      background-color: var(--color-fg);
      padding-right: 0.8rem;
      outline: none;
      border: none;
      border-radius: 2pt;
      width: 200px;

      outline: 0 solid rgba(0, 0, 0, 0);


      transition: all 0.2s ease-out;
    }

    .select:hover {
      cursor: pointer;
      outline: 3px solid var(--color-accent);
    }

    .select:focus {
      outline: 3px solid var(--color-accent);
    }

    .select-arrow svg {
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      pointer-events: none;
      width: 1.4rem;
      height: 1.4rem;
    }

    .product-size-selection {
      font-size: 1.2rem;
      width: 5.2rem;
      max-width: 20rem;
      padding: 0.6rem;      
    }

</style>
`;

tpl_catalogProductCard.innerHTML = `
${tpl_catalogProductCSS}

<div class="product">
      <a
        class="product-image-container"        
        href="#"
        >
          <picture class="product-image">
            <source id="product-image-source"/>
            <img
            loading="lazy"
            class="product-image"
            />
          </picture>
      </a>
      <div class="product-info-container">
          <div class="product-brand"></div>
          <div class="product-title">
            <a></a>          
          </div>
          <div class="product-description">
            <p></p>          
          </div> 

          <div class="product-options-container"></div>
  
          <div class="product-price">
            <span class="product-price-value"></span>
          </div>
  
          <div class="product-button-group">
            <button
              class="button-product button-add"
            >
            </button>
        </div>
      </div>
    </div>
`;

/**
 * Generates HTML for a single option field for a product card.
 *
 * @param {Object} product - The product object.
 * @param {Object} option - The option object.
 * @returns {string} - The HTML for the option field.
 */
function cardOptionField(product, option) {
  let inputBackground = '';
  if (option.optionVisual.type == 'color') {
    inputBackground = `background-color: ${option.optionVisual.value};`;
  } else if (option.optionVisual.type == 'image') {
    inputBackground = `
        background-image: url(${baseUrl}/assets/images/productImages/${option.optionVisual.value}.jpg);
        background-position: center;
        background-size: cover;
      `;
  }

  return `
    <div>
      <input
        type="radio"
        id="option-${product.productId}-${option.optionId}"
        name="options-item-${product.productId}"
        value="option-${option.optionId}"
        data-productId="${product.productId}"
        data-optionid="${option.optionId}"
        ${product.options.indexOf(option) == 0 ? 'checked' : ''}
        style="
          ${inputBackground};
        "
      />
      <label
        for="option-${product.productId}-${option.optionId}"
        class="hidden"
        >${option.optionStyle}</label
      >
    </div>
    `;
}

/**
 * Returns an array of product options that match the specified option's visual value.
 *
 * @param {Object} product - The product object to search for options in.
 * @param {Object} option - The option object to match visual values with.
 * @returns {Array} An array of product options that match the specified option's visual value.
 */
function getOptionStyleSizes(product, option) {
  let optionStyleSizes = [];

  for (let options of product.options) {
    if (
      options.optionVisual.value == option.optionVisual.value &&
      options.optionVisual.value == option.optionVisual.value
    ) {
      optionStyleSizes.push(options);
    }
  }
  return optionStyleSizes;
}

/**
 * Generates an HTML option element for a product card's size selection dropdown.
 * @param {Object} option - The product size option object.
 * @param {string} option.optionSize - The size of the product option.
 * @param {number} option.optionId - The ID of the product option.
 * @returns {string} - The HTML option element as a string.
 */
function cardOptionSelection(option) {
  return `
    <option value="${option.optionSize}" data-optionid=${option.optionId}>${option.optionSize}</option>
    `;
}

/**
 * Generates HTML for a group of product options, such as sizes or colors, in a select element.
 * @param {Object} product - The product object containing the option data.
 * @param {string} option - The name of the option to generate the select element for.
 * @returns {string} The HTML string for the select element.
 */
function cardOptionSelectionGroup(product, option) {
  let optionSelections = '';
  const optionStyleSizes = getOptionStyleSizes(product, option);
  for (let optionSize of optionStyleSizes) {
    optionSelections += cardOptionSelection(optionSize);
  }

  if (optionStyleSizes.length <= 1) {
    return '';
  } else
    return `
    <label for="product-size-select-${product.productId}" class="hidden">Size</label>
  
    <div class="select-wrapper">
      <select
        class="product-size-selection select"
        name="sizes"
        id="product-size-select-${product.productId}"
        data-productId=${product.productId}
      >
        ${optionSelections}
      </select>
      <j-symbol name="nav-arrow-down" class="select-arrow"></j-symbol>
    </div>

    `;
}

/**
 * Returns an array of unique product options based on their style.
 *
 * @param {Object} product - The product object containing options.
 * @returns {Array} An array of unique product options based on their style.
 */
function getUniqueOptionStyles(product) {
  const uniqueOptions = product.options.reduce((acc, option) => {
    const key = `${option.optionVisual.type}-${option.optionVisual.value}`;
    if (!acc[key]) {
      acc[key] = option;
    }
    return acc;
  }, {});

  return Object.values(uniqueOptions);
}

/**
 * Returns the HTML fieldset element containing the product options for a given product.
 *
 * @param {Array} productOptions - An array of product options.
 * @param {Object} product - The product object.
 * @returns {string} - The HTML fieldset element containing the product options.
 */
function getProductFieldset(productOptions, product) {
  let cardOptionsFieldset = undefined;

  if (productOptions.length <= 1) {
    cardOptionsFieldset = '';
  } else {
    let cardProductOptions = '';

    for (let option of productOptions) {
      cardProductOptions += cardOptionField(product, option);
    }

    cardOptionsFieldset = `
      <fieldset class="product-fieldset">
        <legend class="hidden">Variant</legend>
  
        ${cardProductOptions}
  
      </fieldset>
      `;
  }

  return cardOptionsFieldset;
}

/**
 * A custom element that represents a product card in the catalog.
 * @class
 * @extends HTMLElement
 */
class catalogProduct extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_catalogProductCard.content.cloneNode(true);
    shadow.append(clone);

    this.productId = this.getAttribute('productId');

    const product = catalogProducts.find((i) => i.productId == this.productId);

    const cardOptionsSelections = cardOptionSelectionGroup(
      product,
      product.options[0]
    );

    const uniqueOptionsByStyle = getUniqueOptionStyles(product);

    const cardOptionsFieldset = getProductFieldset(
      uniqueOptionsByStyle,
      product
    );

    const productPageUrl = `productPage.html?productid=${product.productId}&optionid=${product.options[0].optionId}`;

    this.productImageContainer = shadow.querySelector(
      '.product-image-container'
    );
    this.productImageContainer.style.backgroundImage = `url(${baseUrl}/assets/images/productImages/smaller_alt/${product.options[0].imageName}_smaller_alt.jpg)`;
    this.productImageContainer.href = productPageUrl;

    this.productImage = shadow.querySelector('.product-image');
    this.productImageSource = shadow.querySelector('#product-image-source');
    this.productImageSource.srcset = `${baseUrl}assets/images/productImages/small/${product.options[0].imageName}_small.webp`;
    this.productImageSource.type = 'image/webp';

    this.productBrand = shadow.querySelector('.product-brand');
    this.productBrand.textContent = product.brand;

    this.productTitle = shadow.querySelector('.product-title a');
    this.productTitle.textContent = product.title;
    this.productTitle.href = productPageUrl;

    this.productDescription = shadow.querySelector('.product-description p');
    this.productDescription.textContent = product.description;

    this.productPrice = shadow.querySelector('.product-price-value');
    this.productPrice.textContent = formatCurrency(product.options[0].price);

    this.productButton = shadow.querySelector('.button-product');
    this.productButton.textContent = 'Add to Cart';

    this.productButton.dataset.productid = this.productId;
    this.productButton.dataset.optionid = product.options[0].optionId;

    this.productOptionsContainer = shadow.querySelector(
      '.product-options-container'
    );
    this.productOptionsContainer.innerHTML =
      cardOptionsFieldset + cardOptionsSelections;

    this.hasFieldset = shadow.querySelector('.product-fieldset') ? true : false;
    if (this.hasFieldset) {
      this.productFieldset = shadow.querySelector('.product-fieldset');
      this.productFieldsetInputs =
        this.productFieldset.getElementsByTagName('input');
    }

    this.hasSelectGroup = shadow.querySelector('.product-size-selection')
      ? true
      : false;
    if (this.hasSelectGroup) {
      this.productSelectGroup = shadow.querySelector('.product-size-selection');
      this.productSelectOptions =
        this.productSelectGroup.getElementsByTagName('option');
    }
  }

  /**
   * Updates the text and disabled state of the "Add to Cart" button for a product card based on whether the item is already in the cart.
   * @function
   * @memberof ProductCard
   * @returns {void}
   */
  updateCatalogItemButton = () => {
    let productButton = undefined;

    let targetElement = this.closest('.product');
    if (targetElement) {
      productButton = targetElement.querySelector('.button-product');
    } else {
      productButton = this.productButton;
    }

    let productId = productButton.dataset.productid;
    let optionId = productButton.dataset.optionid;

    if (findItem(cartItems, productId, optionId)) {
      this.disableCatalogItemButton(productButton);
    } else {
      this.enableCatalogItemButton(productButton);
    }
  };

  enableCatalogItemButton = (productButton) => {
    productButton.disabled = false;
    productButton.textContent = 'Add to Cart';
  };

  disableCatalogItemButton = (productButton) => {
    productButton.disabled = true;
    productButton.textContent = 'Item in Cart';
  };

  /**
   * Handles the change event for a product option select element.
   * Updates the product image, title, price, button, and option set based on the selected option.
   * @function
   */
  handleProductOptionChange() {
    const targetElement = this.closest('.product');

    const productImageContainer = targetElement.querySelector(
      '.product-image-container'
    );
    const productImage = targetElement.querySelector('.product-image');
    const productTitle = targetElement.querySelector('.product-title a');
    const productPrice = targetElement.querySelector('.product-price-value');
    const productButton = targetElement.querySelector('.button-product');

    let productId = this.dataset.productid;
    let optionId = this.dataset.optionid;

    if (!optionId) {
      optionId = this.options[this.selectedIndex].dataset.optionid;
    }

    let targetProduct = catalogProducts.find(
      (product) => product.productId == productId
    );

    let targetProductOption = targetProduct.options.find(
      (productOption) => productOption.optionId == optionId
    );

    let productUrl = `productPage.html?productid=${targetProduct.productId}&optionid=${targetProductOption.optionId}`;

    productImage.src = `${baseUrl}/assets/images/productImages/small/${targetProductOption.imageName}_small.webp `;
    productTitle.setAttribute('href', productUrl);
    productPrice.textContent = formatCurrency(targetProductOption.price);
    productButton.dataset.productid = productId;
    productButton.dataset.optionid = optionId;
    productImageContainer.style = `background-image: url(${baseUrl}/assets/images/productImages/smaller_alt/${targetProductOption.imageName}_smaller_alt.jpg);`;
    productImageContainer.setAttribute('href', productUrl);

    let cardOptionsSelections = cardOptionSelectionGroup(
      targetProduct,
      targetProductOption
    );

    let productOptionSet = undefined;
    let productOptionSetOptions = undefined;

    const hasSelectGroup = targetElement.querySelector(
      '.product-size-selection'
    )
      ? true
      : false;

    if (hasSelectGroup) {
      productOptionSet = targetElement.querySelector('.product-size-selection');
      productOptionSetOptions = productOptionSet.getElementsByTagName('option');
    }

    if (
      !(this.classList[0] == 'product-size-selection') &&
      cardOptionsSelections
    ) {
      productOptionSet.innerHTML = cardOptionsSelections;
    }
  }

  /**
   * Called when the element is inserted into a document, including into a shadow tree.
   * Attaches event listeners to the product button and product options.
   * Updates the catalog item button.
   */
  connectedCallback() {
    this.productButton.addEventListener('click', addToCart);
    this.productButton.addEventListener('click', handleOpenCartMenu);
    this.productButton.addEventListener('click', this.updateCatalogItemButton);

    if (this.hasFieldset) {
      for (let input of this.productFieldsetInputs) {
        input.addEventListener('change', this.handleProductOptionChange);
        input.addEventListener('change', this.updateCatalogItemButton);
      }
    }

    if (this.hasSelectGroup) {
      this.productSelectGroup.addEventListener(
        'change',
        this.handleProductOptionChange
      );
      this.productSelectGroup.addEventListener(
        'change',
        this.updateCatalogItemButton
      );
    }

    this.updateCatalogItemButton();
  }
}

window.customElements.define('catalog-product', catalogProduct);
