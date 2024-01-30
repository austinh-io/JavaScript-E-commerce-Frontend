import { currentTheme } from '../utils/themeManager';

const TPL_ExampleButton = document.createElement('template');

const TPL_ExampleButton_CSS = /* CSS */ `
<style>

</style>
`;

TPL_ExampleButton.innerHTML = /* HTML */ `
  ${TPL_ExampleButton_CSS}

  <button
    class="btn btn-primary"
    part="btn btn-primary">
    <box-icon
      type="solid"
      name="home"
      color=""></box-icon>
    <slot></slot>
  </button>
`;

class ExampleButton extends HTMLElement {
  private _boxicon: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_ExampleButton.content.cloneNode(true);
    shadow.append(clone);
    this._boxicon = shadow.querySelector('box-icon')!;
  }
  connectedCallback() {
    document.addEventListener('themeChanged', () => {
      this.updateIconColor();
    });
    this.updateIconColor();
  }

  updateIconColor() {
    this._boxicon.setAttribute(
      'color',
      currentTheme.theme.properties['--color-on-primary']
    );
  }
}
window.customElements.define('example-button', ExampleButton);
