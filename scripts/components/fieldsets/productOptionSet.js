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

  initOptions = () => {
    let optionSetContent =
      tpl_radioFieldset(this.productId) + tpl_selectionList(this.productId);

    this.shadowRoot.innerHTML = tpl_productOptionSetCSS + optionSetContent;
    this.selectionList = this.shadowRoot.querySelector('selection-list');
    this.radioFieldset = this.shadowRoot.querySelector('radio-fieldset');
  };

  connectedCallback() {
    this.initOptions();

    let product = catalogProducts.find((i) => i.productId == this.productId);
    let initSelectedOption = product.options[0];

    this.selectionList.setAvailableOptions(initSelectedOption);
    this.radioFieldset.setAvailableOptions(initSelectedOption);

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

      this.selectionList.setAvailableOptions(this.selectedOption);
      this.radioFieldset.setAvailableOptions(this.selectedOption);
    });
  }
}

window.customElements.define('product-option-set', productOptionSet);
