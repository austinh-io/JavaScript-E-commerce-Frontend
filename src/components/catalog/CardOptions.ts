const TPL_CardOptions = document.createElement('template');

const TPL_CardOptions_css = /* CSS */ `
<style>

</style>
`;

TPL_CardOptions.innerHTML = /* HTML */ `
  ${TPL_CardOptions_css}

  <div class="container flex-container">CARD OPTIONS!</div>
`;

export default class CardOptions extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_CardOptions.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {}

  disconnectedCallback() {}
}

window.customElements.define('card-options', CardOptions);
