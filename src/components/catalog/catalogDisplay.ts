const TPL_Catalog = document.createElement('template');

const TPL_Catalog_css = /* CSS */ `
<style>
  .catalog-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
</style>
`;

TPL_Catalog.innerHTML = /* HTML */ `
  ${TPL_Catalog_css}
  
  <div class="catalog-container">

  </div>

`;

export default class CatalogDisplay extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_Catalog.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {
  }

  disconnectedCallback() {\
  }
}

window.customElements.define('catalog-display', CatalogDisplay);
