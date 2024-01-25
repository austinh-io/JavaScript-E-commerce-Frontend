const tpl_ahButton = document.createElement('template');

const tpl_ahButton_css = /* CSS */ `
<style>
    button {
        color: gray;
        background: white;
        padding: 1rem;
        font-size: 1.2rem;
    }
</style>
`;

tpl_ahButton.innerHTML = /* HTML */ `
  ${tpl_ahButton_css}

  <button>
    <span>✅</span>
    <span>Complete</span>
  </button>
`;

class ahButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_ahButton.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallBack() {}
}

window.customElements.define('ah-button', ahButton);

export default ahButton;
