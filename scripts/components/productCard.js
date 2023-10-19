import { formatCurrency } from '/scripts/utilities/commerceUtilities.js';
('use strict');

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
        onChange="handleProductOptionChange(event)"
        ${product.options.indexOf(option) == 0 ? 'checked' : ''}
        style="
          ${inputBackground};
        "
      />
      <label
        for="option-${product.productId}-${option.optionId}"
        class="hidden"
        >${option.optionLabel}</label
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
      onChange="handleProductOptionChange(event)"
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

const productCardTemplate = function (product) {
  let cardOptionsSelections = cardOptionSelectionGroup(
    product,
    product.options[0]
  );
  let uniqueOptionsByStyle = getUniqueOptionStyles(product);
  let cardOptionsFieldset = getProductFieldset(uniqueOptionsByStyle, product);

  return `
    <div class="product" id="product-${product.productId}" data-productId=${
    product.productId
  }>
      <a
        class="product-image-container"
        style="
        background-image: url(${baseUrl}/assets/images/productImages/smaller_alt/${
    product.options[0].imageName
  }_smaller_alt.jpg);"
        href="productPage.html?productId=${product.productId}&optionId=${
    product.options[0].optionId
  }"
        >
          <img
          loading="lazy"
          class="product-image"
          src="${baseUrl}/assets/images/productImages/small/${
    product.options[0].imageName
  }_small.webp"
          />
      </a>
      <div class="product-info-container">
          <div class="product-brand">${product.brand}</div>
          <div class="product-title">
            <a href="productPage.html?productId=${product.productId}&optionId=${
    product.options[0].optionId
  }">
            ${product.title}
            </a>          
          </div>
          <div class="product-description">
            <p>
              ${product.description}
            </p>          
          </div>
  
          ${cardOptionsFieldset}
          ${cardOptionsSelections}
  
  
          <div class="product-price">
            <span class="product-price-value">${formatCurrency(
              product.options[0].price
            )}</span>
          </div>
  
          <div class="product-button-group" data-productId=${
            product.productId
          } data-optionid=${product.options[0].optionId}>
            <button
              class="button-product button-add"
              id="button-product-${
                product.productId + product.options[0].optionId
              }"
              onclick="addToCart(event); openCartMenu()"
            >
              ${catalogItemButtonText_Enabled}
            </button>
        </div>
      </div>
    </div>
  `;
};

const catalogProductTplCss = `
<style>
    @import url(/css/shared.css);
    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-title);
    }

    .user-card {
        font-family: var(--font-body);
        background: var(--color-fg);
        color: var(--color-font);
        width: 500px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 10px;
        margin-bottom: 15px;
        border-bottom: SlateGray 5px solid;
    }

    .user-card img {
        width: 100%;
    }

    .user-card button {
        cursor: pointer;
        background: SlateBlue;
        color: #fff;
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;
    }
</style>
`;

const catalogProductCardTPL = document.createElement('template');
catalogProductCardTPL.innerHTML = `
${catalogProductTplCss}

<div class="product" id="assign-me" data-productId=0>
      <a
        class="product-image-container"
        style="
        background-image: url();"
        href="#"
        >
          <img
          loading="lazy"
          class="product-image"
          src=""
          />
      </a>
      <div class="product-info-container">
          <div class="product-brand">a</div>
          <div class="product-title">
            <a href="#">
            a
            </a>          
          </div>
          <div class="product-description">
            <p>
              b
            </p>          
          </div> 

  
  
          <div class="product-price">
            <span class="product-price-value">${formatCurrency(23)}</span>
          </div>
  
          <div class="product-button-group" data-productId="assign-me" data-optionid="assign-me">
            <button
              class="button-product button-add"
              id="button-product-assign-me"
              onclick="addToCart(event); openCartMenu()"
            >
              z
            </button>
        </div>
      </div>
    </div>
`;

class catalogProduct extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const clone = catalogProductCardTPL.content.cloneNode(true);
    shadowRoot.append(clone);
    // shadowRoot.appendChild(catalogProductCardTPL.content.cloneNode(true));

    shadowRoot.getElementById('assign-me').setAttribute('id', 'amogus');

    shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    // this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    // this.shadowRoot.querySelector('.wage').innerText = formatCurrency(
    //   this.getAttribute('wage')
    // );
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const toggleButton = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      info.style.display = 'block';
      toggleButton.innerText = 'Hide Info';
    } else {
      info.style.display = 'none';
      toggleButton.innerText = 'Show Info';
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector('#toggle-info')
      .addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}

window.customElements.define('catalog-product', catalogProduct);
