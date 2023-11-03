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

function calculateAvailableAttributes(selectedOption, product) {
  const productOptions = product.options;
  const currentOption = selectedOption;

  let currentState = currentOption.attributes.reduce((state, attribute) => {
    state[attribute.name] = attribute.value;
    return state;
  }, {});

  // Define a helper function to check compatibility
  const isOptionCompatible = (
    option,
    attributeNameToCheck,
    currentAttributes
  ) => {
    return currentAttributes.every(({ name, value }) => {
      // Skip the attribute if it's the one we're checking compatibility for
      if (name === attributeNameToCheck) return true;

      // Check if the option has an attribute with the same name and value as the current attribute
      const attribute = option.attributes.find((attr) => attr.name === name);
      return attribute && attribute.value === value;
    });
  };

  // Convert currentState to an array of attributes
  const currentAttributes = Object.keys(currentState).map((name) => ({
    name,
    value: currentState[name],
  }));

  // Dynamically create the structure for validAttributes based on current attributes
  let validAttributes = currentAttributes.reduce((acc, attr) => {
    acc[attr.name] = [];
    return acc;
  }, {});

  // Go through each attribute in the currentState and populate validAttributes
  for (const attributeName in validAttributes) {
    productOptions.forEach((option) => {
      option.attributes.forEach((attribute) => {
        if (
          attribute.name === attributeName &&
          !validAttributes[attributeName].includes(attribute.value) &&
          isOptionCompatible(option, attributeName, currentAttributes)
        ) {
          validAttributes[attributeName].push(attribute.value);
        }
      });
    });
  }

  return validAttributes;
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

  setAvailableOptions(selectedOption) {
    let availableAttributes = calculateAvailableAttributes(
      selectedOption,
      this.product
    );

    let selectDropdowns = Array.from(
      this.shadowRoot.querySelectorAll('select.option-selection')
    );

    for (let selectDropdown of selectDropdowns) {
      let name = selectDropdown.getAttribute('name');
      let options = Array.from(selectDropdown.options);

      for (let option of options) {
        let value = option.getAttribute('value');

        if (
          availableAttributes[name] &&
          availableAttributes[name].includes(value)
        ) {
          option.disabled = false;
        } else {
          option.disabled = true;
          if (option.selected) {
            selectDropdown.value = ''; // deselect the option if it's currently selected
          }
        }
      }
    }
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
  }
}

window.customElements.define('selection-list', selectionList);
