import { currentTheme } from '../../utils/ui/themeManager';

const TPL_AppButton = document.createElement('template');

const TPL_AppButton_CSS = /* CSS */ `
<style>
  @media (max-width: 728px) {
    :host {
      width: 100%;
    }
  }

  .hidden {
    display: none;
  }

  button.btn {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: var(--rounded-button);

    padding-inline: 1rem;
    padding-block: 0.6rem;

    font-size: 1.2rem;
    font-weight: 700;

    border: none;

    transition: color 100ms ease-out, background-color 100ms ease-out;
  }

  button > .btn-content {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-inline: 0.4rem;
  }

  /**** Primary ****/

  button.btn-primary {
    background-color: var(--color-primary-500);
    color: var(--color-on-primary);
  }

  button.btn-primary:hover {
    cursor: pointer;
    background-color: var(--color-primary-400);
  }

  button.btn-primary:active {
    background-color: var(--color-primary-600);
  }

  /**** Secondary *****/

  button.btn-secondary {
    background-color: var(--color-secondary-500);
    color: var(--color-on-secondary);
  }

  button.btn-secondary:hover {
    cursor: pointer;
    background-color: var(--color-secondary-400);
  }

  button.btn-secondary:active {
    background-color: var(--color-secondary-600);
  }

  /**** Tertiary *****/

  button.btn-tertiary {
    background-color: var(--color-tertiary-500);
    color: var(--color-on-tertiary);
  }

  button.btn-tertiary:hover {
    cursor: pointer;
    background-color: var(--color-tertiary-400);
  }

  button.btn-tertiary:active,
  a.btn-tertiary:active {
    background-color: var(--color-tertiary-600);
  }
</style>
`;

TPL_AppButton.innerHTML = /* HTML */ `
  ${TPL_AppButton_CSS}

  <button class="btn btn-primary">
    <div class="btn-content">
      <slot></slot>
    </div>
  </button>
`;

class AppButton extends HTMLElement {
  private _boxicon: HTMLElement | undefined;
  private _buttonContent: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_AppButton.content.cloneNode(true);
    shadow.append(clone);
    this._buttonContent = shadow.querySelector('.btn-content')!;
  }

  connectedCallback() {
    console.log('AppButton starting!');
    console.log(this.iconType);
    this.initIcon();
  }

  static get observedAttributes() {
    return [
      'iconName',
      'iconType',
      'iconColor',
      'iconSize',
      'iconRotate',
      'iconFlip',
      'iconBorder',
      'iconAnimation',
      'iconPull',
    ];
  }

  get iconName(): string | null {
    return this.getAttribute('iconName');
  }

  set iconName(value: string | undefined) {
    if (!value || !this._boxicon) return;
    this.setAttribute('iconName', value);
    this._boxicon.setAttribute('name', value);
  }

  get iconType(): string | null {
    return this.getAttribute('iconType');
  }

  set iconType(value: 'regular' | 'solid' | 'logo') {
    if (!this._boxicon) return;
    this.setAttribute('iconType', value);
    this._boxicon.setAttribute('type', value);
  }

  get iconColor(): string | null {
    return this.getAttribute('iconColor');
  }

  set iconColor(value: string | undefined) {
    if (!this._boxicon) return;
    if (!value) {
      this.setAttribute(
        'iconColor',
        currentTheme.theme.properties['--color-on-primary']
      );
      this._boxicon.setAttribute(
        'color',
        currentTheme.theme.properties['--color-on-primary']
      );
      return;
    }
    this.setAttribute('iconColor', value);
    this._boxicon.setAttribute('color', value);
  }

  get iconSize(): string | null {
    return this.getAttribute('iconSize');
  }

  set iconSize(value: 'xs' | 'sm' | 'md' | 'lg' | string) {
    if (!this._boxicon) return;

    this.setAttribute('iconSize', value);
    this._boxicon.setAttribute('size', value);
  }

  get iconRotate(): string | null {
    return this.getAttribute('iconRotate');
  }

  set iconRotate(value: '90' | '180' | '270') {
    if (!this._boxicon) return;

    this.setAttribute('iconRotate', value);
    this._boxicon.setAttribute('rotate', value);
  }

  get iconFlip(): string | null {
    return this.getAttribute('iconFlip');
  }

  set iconFlip(value: 'horizontal' | 'vertical') {
    if (!this._boxicon) return;

    this.setAttribute('iconFlip', value);
    this._boxicon.setAttribute('flip', value);
  }

  get iconBorder(): string | null {
    return this.getAttribute('iconBorder');
  }

  set iconBorder(value: 'square' | 'circle') {
    if (!this._boxicon) return;

    this.setAttribute('iconBorder', value);
    this._boxicon.setAttribute('border', value);
  }

  get iconAnimation(): string | null {
    return this.getAttribute('iconAnimation');
  }

  set iconAnimation(value: string) {
    if (!this._boxicon) return;

    this.setAttribute('iconAnimation', value);
    this._boxicon.setAttribute('animation', value);
  }

  get iconPull(): string | null {
    return this.getAttribute('iconPull');
  }

  set iconPull(value: 'left' | 'right') {
    if (!this._boxicon) return;

    this.setAttribute('iconPull', value);
    this._boxicon.setAttribute('pull', value);
  }

  attributeChangedCallback(attName: string, oldVal: any, newVal: any) {
    console.log('Attribute changed!');
    if (attName === 'iconName') this.iconName = newVal;
    if (attName === 'iconType') this.iconType = newVal;
    if (attName === 'iconColor') this.iconColor = newVal;
    if (attName === 'iconSize') this.iconSize = newVal;
    if (attName === 'iconRotate') this.iconRotate = newVal;
    if (attName === 'iconFlip') this.iconFlip = newVal;
    if (attName === 'iconBorder') this.iconBorder = newVal;
    if (attName === 'iconAnimation') this.iconAnimation = newVal;
    if (attName === 'iconPull') this.iconPull = newVal;
  }

  updateIconColor() {
    if (!this._boxicon) return;

    this._boxicon.setAttribute(
      'color',
      currentTheme.theme.properties['--color-on-primary']
    );
  }

  updateIconAttributes() {
    if (!this._boxicon) return;

    if (this.iconName) this._boxicon.setAttribute('name', this.iconName);
    if (this.iconType) this._boxicon.setAttribute('type', this.iconType);
    if (this.iconColor) this._boxicon.setAttribute('color', this.iconColor);
    if (this.iconSize) this._boxicon.setAttribute('size', this.iconSize);
    if (this.iconRotate) this._boxicon.setAttribute('rotate', this.iconRotate);
    if (this.iconFlip) this._boxicon.setAttribute('flip', this.iconFlip);
    if (this.iconBorder) this._boxicon.setAttribute('border', this.iconBorder);
    if (this.iconAnimation)
      this._boxicon.setAttribute('animation', this.iconAnimation);
    if (this.iconPull) this._boxicon.setAttribute('pull', this.iconPull);
  }

  initIcon() {
    if (this.iconName) {
      this._boxicon = document.createElement('box-icon');
      this._buttonContent.prepend(this._boxicon);
      this.updateIconAttributes();
      this.updateIconColor();
      document.addEventListener('themeChanged', () => {
        this.updateIconColor();
      });
    }
  }
}
window.customElements.define('app-button', AppButton);
