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

    //TODO
    //1. Have this component figure out each unique attribute (by its name) of the product, and make a fieldset for each
    // a. it will use the tpl_selectionList or tpl_radioFieldset based on if the attribute type is radio or select
    //2. Each fieldset component will figure out the unique values for its type of attribute of the product
    //3. Make a radio button/select option for each unique option of that same attribute type

    /* Example:
    Product A has 3 attributes: Color, Size, and Material
    Color and Material are radio buttons, Size is a select dropdown

    There are 3 colors, 4 sizes, and 2 materials
    Therefore, it will generate a radio fieldset of 3 radio buttons, another radio fieldset of 2 radio buttons, and a select dropdown of 4 options
    */
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
