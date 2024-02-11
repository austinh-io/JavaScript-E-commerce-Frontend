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

  button.btn:hover {
    cursor: pointer;
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

  <button class="btn">
    <div class="btn-content">
      <slot></slot>
    </div>
  </button>
`;

class AppButton extends HTMLElement {
  private _boxicon: HTMLElement | undefined;
  private _buttonContent: HTMLElement;
  private _button: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_AppButton.content.cloneNode(true);
    shadow.append(clone);
    this._button = shadow.querySelector('button')!;
    this._buttonContent = shadow.querySelector('.btn-content')!;
  }

  connectedCallback() {
    if (!this.type) {
      this.setAttribute('type', 'primary');
      this._button.classList.add('btn-primary');
    }

    this.initIcon();
  }

  static get observedAttributes() {
    return [
      'type',
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

  get type(): string | null {
    return this.getAttribute('type');
  }

  set type(value: 'primary' | 'secondary' | 'tertiary') {
    if (this.type !== value) this.setAttribute('type', value);
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
    if (oldVal === newVal) return;

    switch (attName) {
      case 'type':
        this.type = newVal;
        this._button.classList.remove(`btn-${oldVal}`);
        this._button.classList.add(`btn-${newVal}`);
        break;
      case 'iconName':
        this.iconName = newVal;
        break;
      case 'iconType':
        this.iconType = newVal;
        break;
      case 'iconColor':
        this.iconColor = newVal;
        break;
      case 'iconSize':
        this.iconSize = newVal;
        break;
      case 'iconRotate':
        this.iconRotate = newVal;
        break;
      case 'iconFlip':
        this.iconFlip = newVal;
        break;
      case 'iconBorder':
        this.iconBorder = newVal;
        break;
      case 'iconAnimation':
        this.iconAnimation = newVal;
        break;
      case 'iconPull':
        this.iconPull = newVal;
        break;
    }
  }

  updateIconColor() {
    if (!this._boxicon) return;
    if (!this.iconColor) {
      this.setIconColorBasedOnTheme();
    } else {
      this._boxicon.setAttribute('color', this.iconColor);
    }
  }

  setIconColorBasedOnTheme() {
    if (!this._boxicon) return;

    switch (this.type) {
      case 'primary':
        this._boxicon.setAttribute(
          'color',
          currentTheme.theme.properties['--color-on-primary']
        );
        break;
      case 'secondary':
        this._boxicon.setAttribute(
          'color',
          currentTheme.theme.properties['--color-on-secondary']
        );
        break;
      case 'tertiary':
        this._boxicon.setAttribute(
          'color',
          currentTheme.theme.properties['--color-on-tertiary']
        );
        break;
      default:
        this._boxicon.setAttribute(
          'color',
          currentTheme.theme.properties['--color-on-primary']
        );
        break;
    }
  }

  updateIconAttributes() {
    if (!this._boxicon) return;

    if (this.iconType) this._boxicon.setAttribute('type', this.iconType);
    if (this.iconName) this._boxicon.setAttribute('name', this.iconName);
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
      this.updateIconAttributes();
      this.updateIconColor();
      this._buttonContent.prepend(this._boxicon);
      document.addEventListener('themeChanged', () => {
        this.updateIconColor();
      });
    }
  }
}
window.customElements.define('app-button', AppButton);
