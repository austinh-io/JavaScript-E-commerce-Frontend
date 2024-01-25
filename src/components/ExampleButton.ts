const TPL_ExampleButton = document.createElement('template');

const TPL_ExampleButton_CSS = /* CSS */ `
<style>
    button {
      color: gray;
      background: #f0f0f0f0;
      padding: 0.6rem;
      font-size: 1.2rem;
      font-weight: 700;
      border-radius: 100pt;
      border: 2px solid hsb(0, 0, 0, 0%);

      transition:
        color 100ms ease-out,
        background-color 100ms ease-out;
    }

    button:hover {
      cursor: pointer;
      background: white;
      color: cornflowerblue;
      border-color: cornflowerblue;
    }

    button:active {
      background: #e0e0e0e0;
      border-color: white;
    }
</style>
`;

TPL_ExampleButton.innerHTML = /* HTML */ `
  ${TPL_ExampleButton_CSS}

  <button>
    <span>
      <box-icon name="home"></box-icon>
    </span>
    <span>Complete</span>
  </button>
`;

class ExampleButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_ExampleButton.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallBack() {}
}

window.customElements.define('example-button', ExampleButton);

export default ExampleButton;
