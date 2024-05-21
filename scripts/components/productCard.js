import {
  formatCurrency,
  findItem,
  baseUrl,
  catalogProducts,
} from '/js-simple-e-com/scripts/utilities/commerceUtilities.js';

import {
  addToCart,
  cartItems,
} from '/js-simple-e-com/scripts/utilities/cartUtilities.js';

import { handleOpenCartMenu } from '/js-simple-e-com/scripts/utilities/menus.js';

('use strict');

const tpl_catalogProductCard = document.createElement('template');

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

    a.product-image-container {
      overflow: hidden;
      aspect-ratio: 5/3;
      height: 100%;
      width: 100%;

      border-radius: 3pt;

      padding: 0;

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

          <div class="product-options-container">
          </div>

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

// function findOptionByAttributes(product, attributes) {
//   return product.options.find((option) =>
//     attributes.every((attr) =>
//       option.attributes.some(
//         (optionAttr) =>
//           optionAttr.name === attr.name && optionAttr.value === attr.value
//       )
//     )
//   );
// }

function findOptionByAttributes(product, attributes) {
  return product.options.find((option) =>
    Object.entries(attributes).every(([attrName, attrValue]) =>
      option.attributes.some(
        (optionAttr) =>
          optionAttr.name === attrName && optionAttr.value === attrValue
      )
    )
  );
}

class catalogProduct extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_catalogProductCard.content.cloneNode(true);
    shadow.append(clone);

    this.productId = this.getAttribute('productId');

    const product = catalogProducts.find((i) => i.productId == this.productId);

    const productPageUrl = `${baseUrl}/productPage?productid=${product.productId}&optionid=${product.options[0].optionId}`;

    this.productImageContainer = shadow.querySelector(
      '.product-image-container'
    );
    this.productImageContainer.style.backgroundImage = `url(${baseUrl}/assets/images/productImages/smaller_alt/${product.options[0].imageSet[0]}_smaller_alt.jpg)`;
    this.productImageContainer.href = productPageUrl;

    this.productImage = shadow.querySelector('.product-image');
    this.productImageSource = shadow.querySelector('#product-image-source');
    this.productImageSource.srcset = `${baseUrl}/assets/images/productImages/small/${product.options[0].imageSet[0]}_small.webp`;
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

    this.productOptionsContainer.insertAdjacentHTML(
      'afterbegin',
      `<product-option-set productid="${this.productId}"></product-option-set>`
    );

    this.selectedOption = product.options[0];
    this.selectedAttributes = {};
  }

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

  handleProductOptionChange = (optionId) => {
    let productId = this.getAttribute('productid');

    let targetProduct = catalogProducts.find(
      (product) => product.productId == productId
    );

    let targetProductOption = targetProduct.options.find(
      (productOption) => productOption.optionId == optionId
    );

    let productUrl = `/productPage?productid=${targetProduct.productId}&optionid=${targetProductOption.optionId}`;

    this.productImage.src = `${baseUrl}/assets/images/productImages/small/${targetProductOption.imageSet[0]}_small.webp `;
    this.productImageSource.srcset = `${baseUrl}/assets/images/productImages/small/${targetProductOption.imageSet[0]}_small.webp `;
    this.productTitle.setAttribute('href', productUrl);
    this.productPrice.textContent = formatCurrency(targetProductOption.price);
    this.productButton.dataset.productid = productId;
    this.productButton.dataset.optionid = optionId;
    this.productImageContainer.style = `background-image: url(${baseUrl}/assets/images/productImages/smaller_alt/${targetProductOption.imageSet[0]}_smaller_alt.jpg);`;
    this.productImageContainer.setAttribute('href', productUrl);
  };

  connectedCallback() {
    this.productOptionsContainer.setAttribute('productid', this.productId);

    this.productButton.addEventListener('click', addToCart);
    this.productButton.addEventListener('click', handleOpenCartMenu);
    this.productButton.addEventListener('click', this.updateCatalogItemButton);

    let product = catalogProducts.find((i) => i.productId == this.productId);
    let productButton = this.productButton;

    this.productOptionsContainer.addEventListener(
      'attributes-collected',
      (event) => {
        this.selectedOption = findOptionByAttributes(product, event.detail);

        productButton.dataset.optionid = this.selectedOption.optionId;
        this.handleProductOptionChange(this.selectedOption.optionId);
        this.updateCatalogItemButton();
      }
    );

    this.updateCatalogItemButton();
  }
}

window.customElements.define('catalog-product', catalogProduct);
