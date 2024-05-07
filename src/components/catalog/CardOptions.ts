import { ProductGroup } from '../../models/productGroup';

const TPL_CardOptions = document.createElement('template');

const TPL_CardOptions_css = /* CSS */ `
<style>
  .test-title {
    font-weight: 700;
    font-size: 0.6rem;
    margin-block: 0.6rem;
  }
</style>
`;

TPL_CardOptions.innerHTML = /* HTML */ `
  ${TPL_CardOptions_css}

  <div class="test-title">CARD OPTIONS!</div>
`;

export default class CardOptions extends HTMLElement {
  private _productGroup: ProductGroup;

  constructor(productGroup: ProductGroup) {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_CardOptions.content.cloneNode(true);
    shadow.append(clone);

    this._productGroup = productGroup;
  }

  connectedCallback() {}

  disconnectedCallback() {}
}

window.customElements.define('card-options', CardOptions);
