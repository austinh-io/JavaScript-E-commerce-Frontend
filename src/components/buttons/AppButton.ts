import { currentTheme } from '../../utils/ui/themeManager';

const TPL_AppButton = document.createElement('template');

const TPL_AppButton_CSS = /* CSS */ `
<style>

  :host {

    /*** All Buttons ***/
    --btn-height-sm: 32px;
    --btn-height-md: 44px;
    --btn-height-lg: 52px;

    /*** Icon sizes (all) ***/
    --icon-size-sm: 16px;
    --icon-size-md: 20px;
    --icon-size-lg: 24px;

    /*** Buttons with only text ***/
    --btn-text-only-padding-sm: 16px;
    --btn-text-only-padding-md: 24px;
    --btn-text-only-padding-lg: 32px;

    /*** Buttons with icons and text ***/
    /* padding left */
    --btn-dual-padding-l-sm: 12px;
    --btn-dual-padding-l-md: 20px;
    --btn-dual-padding-l-lg: 24px;

    /* padding right */
    --btn-dual-padding-r-sm: 16px;
    --btn-dual-padding-r-md: 24px;
    --btn-dual-padding-r-lg: 32px;

    /* padding between icon and text */
    --btn-dual-gap-sm: 4px;
    --btn-dual-gap-md: 8px;
    --btn-dual-gap-lg: 8px;

  }

  :host([fullWidth="true"]) {
    width: 100%;
  }

  .aspect-square {
    aspect-ratio: 1/1;
  }

  .icon-sm {
    height: var(--icon-size-sm);
    width: var(--icon-size-sm);
  }

  .icon-md {
    height: var(--icon-size-md);
    width: var(--icon-size-md);
  }

  .icon-lg {
    height: var(--icon-size-lg);
    width: var(--icon-size-lg);
  }

  .btn-sm {
    height: var(--btn-height-sm);
    min-width: var(--btn-height-sm);
  }

  .btn-md {
    height: var(--btn-height-md);
    min-width: var(--btn-height-md);
  }

  .btn-lg {
    height: var(--btn-height-lg);
    min-width: var(--btn-height-lg);
  }

  .btn-only-text-content-sm {
    padding-inline: var(--btn-text-only-padding-sm);
  }

  .btn-only-text-content-md {
    padding-inline: var(--btn-text-only-padding-md);
  }

  .btn-only-text-content-lg {
    padding-inline: var(--btn-text-only-padding-lg);
  }

  .btn-dual-content-sm {
    padding-left: var(--btn-dual-padding-l-sm);
    padding-right: var(--btn-dual-padding-r-sm);
    gap: var(--btn-dual-gap-sm);
  }

  .btn-dual-content-md {
    padding-left: var(--btn-dual-padding-l-md);
    padding-right: var(--btn-dual-padding-r-md);
    gap: var(--btn-dual-gap-md);
  }

  .btn-dual-content-lg {
    padding-left: var(--btn-dual-padding-l-lg);
    padding-right: var(--btn-dual-padding-r-lg);
    gap: var(--btn-dual-gap-lg);
  }

  .btn-full-width {
    width: 100%;
  }

  button.btn {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0;
    padding: 0;

    border: none;
    border-radius: var(--rounded-button);

    font-size: 1rem;
    font-weight: 600;

    transition: color 100ms ease-out, background-color 100ms ease-out;
  }

  button.btn:hover {
    cursor: pointer;
  }

  .btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
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

  @media (max-width: 728px) {
    :host {
      width: 100%;
    }
  }

  .hidden {
    display: none;
  }

  slot {
    display: flex;
    align-items: center;
    justify-content: center;
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
  private _button: HTMLElement;
  private _buttonContent: HTMLElement;

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
    this.initButtonSizing();
    this.updateButtonSizing();
  }

  initButtonSizing() {
    if (!this.size) this.size = 'md';
    if (!this.fullWidth) this.fullWidth = 'false';
  }

  updateButtonSizing() {
    this.resetButtonSizeClasses();
    if (this.innerText && this._boxicon) {
      /* Has Icon + Text */
      this.setButtonTextAndIcon();
    } else if (this.innerText) {
      /* No icon, only text */
      this.setButtonTextOnly();
    } else if (this._boxicon) {
      /* No text, only icon */
      this.setButtonIconOnly();
    }
  }

  setButtonIconOnly() {
    this.setButtonWidth();

    this._button.classList.add(`aspect-square`);
    this._boxicon!.classList.add(`icon-${this.size}`);
  }

  setButtonTextOnly() {
    this.setButtonWidth();

    this._buttonContent.classList.add(`btn-only-text-content-${this.size}`);
  }

  setButtonTextAndIcon() {
    this.setButtonWidth();

    this._boxicon!.classList.add(`icon-${this.size}`);
    this._buttonContent.classList.add(`btn-dual-content-${this.size}`);
  }

  setButtonWidth() {
    if (this.fullWidth === 'true') {
      this._button.classList.add('btn-full-width');
    }

    this._button.classList.add(`btn-${this.size}`);
  }

  resetButtonSizeClasses() {
    this._button.classList.remove('aspect-square');
    this._button.classList.remove('btn-full-width');

    this._button.classList.remove('btn-sm');
    this._button.classList.remove('btn-md');
    this._button.classList.remove('btn-lg');

    this._buttonContent.classList.remove('btn-only-text-content-sm');
    this._buttonContent.classList.remove('btn-only-text-content-md');
    this._buttonContent.classList.remove('btn-only-text-content-lg');

    this._buttonContent.classList.remove('btn-dual-content-sm');
    this._buttonContent.classList.remove('btn-dual-content-md');
    this._buttonContent.classList.remove('btn-dual-content-lg');
  }

  static get observedAttributes() {
    return [
      'type',
      'size',
      'fullWidth',
      'iconName',
      'iconType',
      'iconColor',
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

  get size(): string | null {
    return this.getAttribute('size');
  }

  set size(value: 'sm' | 'md' | 'lg') {
    if (this.size !== value) this.setAttribute('size', value);
  }

  get fullWidth(): string | null {
    return this.getAttribute('fullWidth');
  }

  set fullWidth(value: 'true' | 'false') {
    if (this.fullWidth !== value) this.setAttribute('fullWidth', value);
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
        currentTheme.properties['--color-on-primary']
      );
      this._boxicon.setAttribute(
        'color',
        currentTheme.properties['--color-on-primary']
      );
      return;
    }
    this.setAttribute('iconColor', value);
    this._boxicon.setAttribute('color', value);
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
      case 'size':
        this.size = newVal;
        break;
      case 'fullWidth':
        this.fullWidth = newVal;
        break;
      case 'iconName':
        this.iconName = newVal;
        break;
      case 'iconType':
        this.iconType = newVal;
        break;
      case 'iconColor':
        this.iconColor = newVal;
        this.updateIconColor();
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
          currentTheme.properties['--color-on-primary']
        );
        break;
      case 'secondary':
        this._boxicon.setAttribute(
          'color',
          currentTheme.properties['--color-on-secondary']
        );
        break;
      case 'tertiary':
        this._boxicon.setAttribute(
          'color',
          currentTheme.properties['--color-on-tertiary']
        );
        break;
      default:
        this._boxicon.setAttribute(
          'color',
          currentTheme.properties['--color-on-primary']
        );
        break;
    }
  }

  updateIconAttributes() {
    if (!this._boxicon) return;

    if (this.iconType) this._boxicon.setAttribute('type', this.iconType);
    if (this.iconName) this._boxicon.setAttribute('name', this.iconName);
    if (this.iconColor) this._boxicon.setAttribute('color', this.iconColor);
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

  disconnectedCallback() {
    document.removeEventListener('themeChanged', () => {
      this.updateIconColor();
    });
  }
}
window.customElements.define('app-button', AppButton);
