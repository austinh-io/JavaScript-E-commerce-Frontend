import {
  formatCurrency,
  findItem,
  baseUrl,
  catchProductList,
  catalogProducts,
} from '/scripts/utilities/commerceUtilities.js';

('use strict');

const tpl_catalogProductCard = document.createElement('template');

const tpl_catalogProductCSS = `
<style>
    @import url(/css/shared.css);

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

      overflow: hidden;
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
    }

    a.product-image-container {
      backdrop-filter: blur(10px);
      background-size: cover;
      background-position: center;
    }

    img.product-image {
      transition: transform 0.25s ease;
    }

    img.product-image:hover {
      transform: scale(1.05);
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

    .product-size-selection {
      font-size: 1.2rem;
      width: 4rem;
      max-width: 20rem;
      padding: 0.4rem;
      border: none;
      border-radius: 3pt;
      color: var(--color-font);
      background-color: var(--color-fg);
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
          <img
          loading="lazy"
          class="product-image"
          />
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

function cardOptionSelection(option) {
  return `
    <option value="${option.optionSize}" data-optionId=${option.optionId}>${option.optionSize}</option>
    `;
}

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
  
    <select
      class="product-size-selection"
      name="sizes"
      id="product-size-select-${product.productId}"
      data-productId=${product.productId}
    >
      ${optionSelections}
    </select>
    `;
}

function getUniqueOptionStyles(product) {
  let uniqueOptionsByStyle = [];

  product.options.filter((option) => {
    if (
      uniqueOptionsByStyle.find((element) => {
        return (
          option.optionVisual.type == element.optionVisual.type &&
          option.optionVisual.value == element.optionVisual.value
        );
      })
    ) {
      return option;
    } else {
      uniqueOptionsByStyle.push(option);
    }
  });

  return uniqueOptionsByStyle;
}

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

    const productPageUrl = `productPage.html?productId=${product.productId}&optionId=${product.options[0].optionId}`;

    this.productImageContainer = shadow.querySelector(
      '.product-image-container'
    );
    this.productImageContainer.style.backgroundImage = `url(${baseUrl}/assets/images/productImages/small_alt/item18-0_small_alt.png)`;
    this.productImageContainer.href = productPageUrl;

    this.productImage = shadow.querySelector('.product-image');
    this.productImage.src = `${baseUrl}assets/images/productImages/small/${product.options[0].imageName}_small.webp`;

    this.productBrand = shadow.querySelector('.product-brand');
    this.productBrand.textContent = product.brand;

    this.productTitle = shadow.querySelector('.product-title a');
    this.productTitle.textContent = product.title;
    this.productTitle.href = productPageUrl;

    this.productDescription = shadow.querySelector('.product-description p');
    this.productDescription.textContent = product.description;

    this.productPrice = shadow.querySelector('.product-price-value');
    this.productPrice.textContent = formatCurrency(product.options[0].price);

    // this.productButtonGroup = shadow.querySelector('.product-button-group');

    this.productButton = shadow.querySelector('.button-product');
    this.productButton.textContent = 'Add to Cart';
    this.productButton.setAttribute('productId', this.productId);
    this.productButton.setAttribute(
      'productOptionId',
      product.options[0].optionId
    );

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

  addToCart() {
    const productId = this.getAttribute('productId');
    console.log(productId);
  }

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

    productImage.src = `${baseUrl}/assets/images/productImages/small/${targetProductOption.imageName}_small.webp `;
    productTitle.setAttribute(
      'href',
      `productPage.html?productId=${targetProduct.productId}&optionId=${targetProductOption.optionId}`
    );
    productPrice.textContent = formatCurrency(targetProductOption.price);
    productButton.setAttribute('productid', this.dataset.productid);
    productButton.setAttribute('optionid', this.dataset.optionid);
    productImageContainer.style = `background-image: url(${baseUrl}/assets/images/productImages/smaller_alt/${targetProductOption.imageName}_smaller_alt.jpg);`;
    productImageContainer.setAttribute(
      'href',
      `productPage.html?productId=${targetProduct.productId}&optionId=${targetProductOption.optionId}`
    );

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

  connectedCallback() {
    this.productButton.addEventListener('click', this.addToCart);

    if (this.hasFieldset) {
      for (let input of this.productFieldsetInputs) {
        input.addEventListener('change', this.handleProductOptionChange);
      }
    }

    if (this.hasSelectGroup) {
      this.productSelectGroup.addEventListener(
        'change',
        this.handleProductOptionChange
      );
    }
  }
}

window.customElements.define('catalog-product', catalogProduct);
