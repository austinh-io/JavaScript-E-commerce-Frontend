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

    /*TODO

    0. Get all the Options from the Product
    1. Get all the unique Attributes from each Option
      a. Attributes are similar if they have the same Name and Type
      b. Similar Attributes with different Values will be put into the same fieldset
        i. This is how the user will select their desired Attribute
      c. If the Attribute Type is Radio, it will be put into a radio fieldset
        i. The Radio style (background) will be defined by the RadioVisual property of the Attribute of type Radio
        ii. Select types do not need a style, as they are a dropdown
      d. If the Attribute Type is Select, it will be put into a selection list 
    2. There will be a FindProductOption function that will search the Product for the Option that has the same Attributes as the ones selected by the user
      a. Every time the user changes an option, this function will be called
      b. If the function returns an Option, then that OptionId will be assigned to the Product's Add to Cart button
      c. Every Attribute has a unique ID within the scope of its Option, and the FindProductOption function will use this to find the correct Option, along with the Option ID
        i. Example: const selectedOption = FindProductOption(optionId, colorId, sizeId, materialId)
        ii. The function likely will take in a nested find function, as it must check every Option Id of the Product and compare the Attribute Id's of each Option to the selected Attributes
        iii. Each selection will simply store the Attribute Id of the selected Attribute, and the FindProductOption function will use this to find the correct Option
      d. We can simplify this by having a FindAttribute function if we already have our Product Option
    1. Have this component figure out each unique attribute (by its name) of the product, and make a fieldset for each
      a. it will use the tpl_selectionList or tpl_radioFieldset based on if the attribute type is radio or select
    2. Each fieldset component will figure out the unique values for its type of attribute of the product
    3. Make a radio button/select option for each unique option of that same attribute type

     Example:
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
