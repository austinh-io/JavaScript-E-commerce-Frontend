import {
  baseUrl,
  catalogProducts,
} from '/scripts/utilities/commerceUtilities.js';

('use strict');

const tpl_selectionList = document.createElement('template');

const tpl_selectionListCSS = `
<style>
    @import url(${baseUrl}/css/main.css);

    .select-wrapper {
      position: relative;
      display: inline-block;
    }

    .option-selections-container {
      display: flex;
      flex-direction: column;
      max-width: 12rem;
      gap: 1rem;
    }

    .option-selection {
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
      width: 100%;

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
      pointer-events: none;
      width: 1.4rem;
      height: 1.4rem;
    }


</style>
`;

function createAttributeSelectors(product) {
  let html = '';
  let attributes = {};

  // Gather all unique attributes
  product.options.forEach((option) => {
    option.attributes.forEach((attr) => {
      if (!attributes[attr.name]) {
        attributes[attr.name] = { type: attr.type, values: new Set() };
      }
      attributes[attr.name].values.add(attr.value);
    });
  });

  // Create HTML for each attribute
  for (let name in attributes) {
    if (attributes[name].type === 'select') {
      html += `<div class="select-wrapper">`;
      html += `<label for="${name}">${name}</label>`;
      html += `<select id="${name}" class="option-selection select">`;
      attributes[name].values.forEach((value) => {
        html += `<option value="${value}">${value}</option>`;
      });
      html += `</select>`;
      html += `<j-symbol name="nav-arrow-down" class="select-arrow"></j-symbol>`;
      html += `</div>`;
    }
  }

  return html;
}

let tpl_selectionOption = `
  <option value="option-a">Option A</option>
`;

tpl_selectionList.innerHTML = `
${tpl_selectionListCSS}

<div class="option-selections-container">

</div>
`;

class selectionList extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_selectionList.content.cloneNode(true);
    shadow.append(clone);

    this.productId = this.getAttribute('productid');

    this.optionSelectionsContainer = this.shadowRoot.querySelector(
      '.option-selections-container'
    );
  }

  connectedCallback() {
    let product = catalogProducts.find(
      (product) => product.productId == this.productId
    );
    let html = createAttributeSelectors(product);

    this.optionSelectionsContainer.innerHTML = html;
  }
}

window.customElements.define('selection-list', selectionList);
