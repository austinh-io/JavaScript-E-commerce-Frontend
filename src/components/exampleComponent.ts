const TPL_ExampleComponent = document.createElement('template');

const TPL_ExampleComponent_css = /* CSS */ `
<style>
    div {
        color: salmon;
        border: 2px solid cornflowerblue;
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

  connectedCallBack() {}
}

window.customElements.define('example-component', ExampleComponent);

export default ExampleComponent;
