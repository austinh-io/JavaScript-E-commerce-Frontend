import {
  baseUrl,
  catalogProducts,
} from '/scripts/utilities/commerceUtilities.js';

('use strict');

const tpl_selectionList = document.createElement('template');

const tpl_selectionListCSS = `
<style>
    @import url(${baseUrl}/css/main.css);

    .option-selections-container {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }

    .select-wrapper:last-child {
      margin-right: 0;

    }

    .select-wrapper {
      position: relative;
      display: inline-block;
      max-width: 10rem;
      margin-right: 1rem;
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
  Object.keys(attributes).forEach((name) => {
    if (
      attributes[name].type === 'select' &&
      attributes[name].values.size > 1
    ) {
      html += `<div class="select-wrapper">`;
      html += `<label for="${name}">${name}</label>`;
      html += `<select id="${name}" name="${name}" class="option-selection select">`;
      attributes[name].values.forEach((value) => {
        html += `<option value="${value}" >${value}</option>`;
      });
      html += `</select>`;
      html += `<j-symbol name="nav-arrow-down" class="select-arrow"></j-symbol>`;
      html += `</div>`;
    }
  });

  return html;
}

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

    this.product = catalogProducts.find(
      (product) => product.productId == this.productId
    );

    this.optionSelectionsContainer = this.shadowRoot.querySelector(
      '.option-selections-container'
    );
  }

  setAvailableOptions(availableAttributes, selectedOption) {
    // Update attribute selectors
    // for (let attribute of selectedOption.attributes) {
    //   let selector;
    //   if (attribute.type === 'select') {
    //     selector = this.shadowRoot.querySelector(
    //       `select[name="${attribute.name}"]`
    //     );
    //   }
    //   if (selector && availableAttributes) {
    //     for (let i = 0; i < selector.options.length; i++) {
    //       let option = selector.options[i];
    //       if (availableAttributes[attribute.name].has(option.value)) {
    //         option.disabled = false;
    //       } else {
    //         option.disabled = true;
    //       }
    //     }
    //   }
    // }
  }

  connectedCallback() {
    let html = createAttributeSelectors(this.product);
    this.optionSelectionsContainer.innerHTML = html;

    let dropDownItems = this.shadowRoot.querySelectorAll('select');

    dropDownItems.forEach((dropDownItem) => {
      dropDownItem.addEventListener('click', function (event) {
        let attributeSelectedEvent = new CustomEvent('attribute-selected', {
          detail: {
            name: this.name,
            value: this.value,
          },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(attributeSelectedEvent);
      });
    });

    let mySelector = this.shadowRoot.querySelector(`select[name="size"]`);
  }
}

window.customElements.define('selection-list', selectionList);
