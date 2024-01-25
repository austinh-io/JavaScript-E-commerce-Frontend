const TPL_ExampleButton = document.createElement('template');

const TPL_ExampleButton_CSS = /* CSS */ `
<style>

</style>
`;

TPL_ExampleButton.innerHTML = /* HTML */ `
  ${TPL_ExampleButton_CSS}

  <button
    class="btn btn-primary"
    part="example-button">
    <box-icon name="home"></box-icon>
    Complete
  </button>
`;

class ExampleButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_ExampleButton.content.cloneNode(true);
    shadow.append(clone);
  }
  connectedCallback() {}
}
window.customElements.define('example-button', ExampleButton);
