import { currentTheme } from '../../utils/ui/themeManager';

const TPL_AppButton = document.createElement('template');

const TPL_AppButton_CSS = /* CSS */ `
<style>
  @media (max-width: 728px) {
    :host {
      width: 100%;
    }
  }
</style>
`;

TPL_AppButton.innerHTML = /* HTML */ `
  ${TPL_AppButton_CSS}

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

class AppButton extends HTMLElement {
  private _boxicon: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_AppButton.content.cloneNode(true);
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
window.customElements.define('app-button', AppButton);
