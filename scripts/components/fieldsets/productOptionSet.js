import {
  baseUrl,
  catalogProducts,
} from '/scripts/utilities/commerceUtilities.js';

('use strict');

const tpl_productOptionSet = document.createElement('template');

function tpl_selectionList(productId) {
  return `
<selection-list productid="${productId}"></selection-list>
`;
}

function tpl_radioFieldset(productId) {
  return `
<radio-fieldset productid="${productId}"></radio-fieldset>
`;
}

const tpl_productOptionSetCSS = `
<style>
    @import url(${baseUrl}/css/main.css);

    :host {
      display: flex;
      flex-direction: column;
    }    
</style>
`;

function matchesSelectedAttributes(option, selectedAttributes) {
  for (let attr of option.attributes) {
    if (
      selectedAttributes[attr.name] &&
      selectedAttributes[attr.name] !== attr.value
    ) {
      return false;
    }
  }
  return true;
}

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

class productOptionSet extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_productOptionSet.content.cloneNode(true);
    shadow.append(clone);

    this.productId = this.getAttribute('productid');
    this.product = catalogProducts.find(
      (product) => product.productId == this.productId
    );
    this.option = this.product.options[0];
    this.selectedAttributes = {};

    this.selectionList = undefined;
    this.radioFieldset = undefined;
  }

  setSelectedOption(option) {
    console.log('Product Option Set: Selected Option');

    this.option = option;
    console.log(this.option);
  }

  getSelectedOption = () => {
    return this.option;
  };

  initOptions = () => {
    let optionSetContent =
      tpl_radioFieldset(this.productId) + tpl_selectionList(this.productId);

    this.shadowRoot.innerHTML = tpl_productOptionSetCSS + optionSetContent;
    this.selectionList = this.shadowRoot.querySelector('selection-list');
    this.radioFieldset = this.shadowRoot.querySelector('radio-fieldset');
  };

  updateAvailableOptions = (selectedAttributes, option) => {
    // console.log('Product Option Set: Update Available Options');
    let availableAttributes = {};

    // Initialize availableAttributes with empty sets
    this.product.options.forEach((option) => {
      option.attributes.forEach((attr) => {
        if (!availableAttributes[attr.name]) {
          availableAttributes[attr.name] = new Set();
        }
      });
    });

    // Find available attributes
    this.product.options.forEach((_option) => {
      if (matchesSelectedAttributes(_option, this.selectedAttributes)) {
        for (let attr of _option.attributes) {
          availableAttributes[attr.name].add(attr.value);
        }
      }
    });

    // Update attribute selectors
    for (let name in this.product.attributes) {
      let selector = this.shadowRoot.querySelector(`#${name}`);
      for (let option of selector.options) {
        if (availableAttributes[name].has(option.value)) {
          option.disabled = false;
        } else {
          option.disabled = true;
        }
      }
    }
  };

  connectedCallback() {
    this.initOptions();

    let product = catalogProducts.find((i) => i.productId == this.productId);

    this.updateAvailableOptions(
      this.selectedAttributes,
      this.getSelectedOption()
    );

    this.selectionList.setAvailableOptions(
      this.availableAttributes,
      this.getSelectedOption()
    );
    this.radioFieldset.setAvailableOptions(
      this.availableAttributes,
      this.getSelectedOption()
    );

    this.addEventListener('attribute-selected', (event) => {
      this.selectedAttributes[event.detail.name] = event.detail.value;

      let attributesSelectedEvent = new CustomEvent('attributes-collected', {
        detail: this.selectedAttributes,
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(attributesSelectedEvent);

      this.selectedOption = findOptionByAttributes(
        product,
        this.selectedAttributes
      );

      this.updateAvailableOptions(
        this.selectedAttributes,
        this.getSelectedOption()
      );

      this.selectionList.setAvailableOptions(
        this.availableAttributes,
        this.getSelectedOption()
      );
      this.radioFieldset.setAvailableOptions(
        this.availableAttributes,
        this.getSelectedOption()
      );
    });

    // this.addEventListener('attribute-selected', (event) => {
    //   this.selectionList.updateAvailableOptions(this.selectedAttributes);
    //   this.radioFieldset.updateAvailableOptions(this.selectedAttributes);
    // });

    // console.log(this);
  }

  // handleAttributeSelection() {
  //   return function (event) {
  //     this.selectedAttributes[event.detail.name] = event.detail.value;

  //     let attributesSelectedEvent = new CustomEvent('attributes-collected', {
  //       detail: this.selectedAttributes,
  //       bubbles: true,
  //       composed: true,
  //     });
  //     this.dispatchEvent(attributesSelectedEvent);
  //     console.log('Option Set Attributes Collected');
  //   };
  // }
}

window.customElements.define('product-option-set', productOptionSet);
