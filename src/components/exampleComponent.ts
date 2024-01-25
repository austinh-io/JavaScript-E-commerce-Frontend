const tpl_exampleComponent = document.createElement('template');

const tpl_exampleComponent_css = /* CSS */ `
<style>
    div {
        color: salmon;
        border: 2px solid cornflowerblue;
        border-radius: 5pt;
    }
</style>
`;

tpl_exampleComponent.innerHTML = /* HTML */ `
  ${tpl_exampleComponent_css}

  <div>
    <h3>Lorem Ipsum</h3>
    <p>An example component!</p>
  </div>
`;

class exampleComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_exampleComponent.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallBack() {}
}

window.customElements.define('example-component', exampleComponent);

export default exampleComponent;
