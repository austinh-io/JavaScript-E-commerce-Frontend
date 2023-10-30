import { baseUrl } from '/scripts/utilities/commerceUtilities.js';

('use strict');

const tpl_radioFieldset = document.createElement('template');

const tpl_radioFieldsetCSS = `
<style>
    @import url(${baseUrl}/css/main.css);

    .select-wrapper {
      position: relative;
      display: inline-block;
    }

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


</style>
`;

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
    <option value="${option.optionSize}" data-optionid=${option.optionId}>${option.optionSize}</option>
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

tpl_radioFieldset.innerHTML = `
${tpl_radioFieldsetCSS}

<label for="product-size-select-test1" class="hidden">Size</label>
  
<div class="select-wrapper">
  <fieldset class="product-fieldset">
    <legend class="hidden">Variant</legend>
  
    <div>
      <input
        type="radio"
        id="option-test1"
        name="options-item-test1"
        value="option-test1"
        data-productId="test1"
        data-optionid="test1"
      />

      <label for="option-test1" class="hidden">
        test
      </label>
    </div>

    <div>
    <input
      type="radio"
      id="option-test1"
      name="options-item-test1"
      value="option-test1"
      data-productId="test1"
      data-optionid="test1"
    />

    <label for="option-test1" class="hidden">
      test
    </label>
  </div>

  <div>
    <input
      type="radio"
      id="option-test1"
      name="options-item-test1"
      value="option-test1"
      data-productId="test1"
      data-optionid="test1"
    />

    <label for="option-test1" class="hidden">
      test
    </label>
  </div>
  
  </fieldset>
</div>
`;

class radioFieldset extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_radioFieldset.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {}
}

window.customElements.define('radio-fieldset', radioFieldset);
