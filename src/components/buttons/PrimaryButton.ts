import { currentTheme } from '../../utils/themeManager';

const TPL_PrimaryButton = document.createElement('template');

const TPL_PrimaryButton_CSS = /* CSS */ `
<style>

</style>
`;

TPL_PrimaryButton.innerHTML = /* HTML */ `
  ${TPL_PrimaryButton_CSS}

  <button
    class="btn btn-primary"
    part="btn btn-primary">
    <div
      class="btn-content"
      part="btn-content">
      <box-icon
        type="solid"
        name="home"
        color=""></box-icon>
      <slot></slot>
    </div>
  </button>
`;

class PrimaryButton extends HTMLElement {
  private _boxicon: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_PrimaryButton.content.cloneNode(true);
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
window.customElements.define('primary-button', PrimaryButton);
