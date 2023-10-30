import { baseUrl } from '/scripts/utilities/commerceUtilities.js';

('use strict');

const tpl_productOptionSet = document.createElement('template');

const tpl_selectionList = `
<selection-list></selection-list>
`;

const tpl_radioFieldset = `
<radio-fieldset></radio-fieldset>
`;

const tpl_productOptionSetCSS = `
<style>
    @import url(${baseUrl}/css/main.css);

    :host {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
</style>
`;

class productOptionSet extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_productOptionSet.content.cloneNode(true);
    shadow.append(clone);

    this.productId = this.getAttribute('productId');
  }

  getProductAttributes() {
    //todo: get all unique attributes of the product
  }

  initOptions = () => {
    this.getProductAttributes();
    let optionSetContent = '';

    //Test generation of radioFieldset and selectionList
    for (let i = 0; i <= 2; i++) {
      if (i === 0) optionSetContent += tpl_radioFieldset;
      else optionSetContent += tpl_selectionList;
    }

    this.shadowRoot.innerHTML = tpl_productOptionSetCSS + optionSetContent;
  };

  connectedCallback() {
    this.initOptions();
  }
}

window.customElements.define('product-option-set', productOptionSet);
