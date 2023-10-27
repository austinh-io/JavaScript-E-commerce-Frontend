import { baseUrl } from '/scripts/utilities/commerceUtilities.js';

('use strict');

const tpl_selectionList = document.createElement('template');

const tpl_selectionListCSS = `
<style>
    @import url(${baseUrl}/css/main.css);

    .select-wrapper {
      position: relative;
      display: inline-block;
    }

    .product-size-selection {
      font-size: 1.2rem;
      padding: 0.6rem;      
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
      width: 8rem;

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

tpl_selectionList.innerHTML = `
${tpl_selectionListCSS}

<label for="product-size-select-test1" class="hidden">Size</label>
  
<div class="select-wrapper">
  <select
    class="product-size-selection select"
    name="sizes"
    id="product-size-select-test1"
    data-productId="test1"
  >
    <option value="option-a">Option A</option>
    <option value="option-b">Option B</option>
    <option value="option-c">Option C</option>
  </select>
  <j-symbol name="nav-arrow-down" class="select-arrow"></j-symbol>
</div>
`;

class selectionList extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_selectionList.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {}
}

window.customElements.define('selection-list', selectionList);
