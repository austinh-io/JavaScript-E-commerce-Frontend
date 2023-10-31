import { baseUrl } from '/scripts/utilities/commerceUtilities.js';

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

class productOptionSet extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_productOptionSet.content.cloneNode(true);
    shadow.append(clone);

    this.productId = this.getAttribute('productid');
  }

  initOptions = () => {
    let optionSetContent =
      tpl_radioFieldset(this.productId) + tpl_selectionList(this.productId);

    this.shadowRoot.innerHTML = tpl_productOptionSetCSS + optionSetContent;
  };

  connectedCallback() {
    this.initOptions();
  }
}

window.customElements.define('product-option-set', productOptionSet);
