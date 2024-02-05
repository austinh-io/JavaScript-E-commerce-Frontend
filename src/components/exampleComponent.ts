const TPL_ExampleComponent = document.createElement('template');

const TPL_ExampleComponent_css = /* CSS */ `
<style>
    div {
        border: 2px solid var(--color-secondary-700);
        border-radius: 5pt;
        padding: 0.6rem;
    }
</style>
`;

TPL_ExampleComponent.innerHTML = /* HTML */ `
  ${TPL_ExampleComponent_css}

  <div>
    <h3>Lorem Ipsum</h3>
    <p>An example component!</p>
  </div>
`;

class ExampleComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_ExampleComponent.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {}
}

window.customElements.define('example-component', ExampleComponent);

export default ExampleComponent;
