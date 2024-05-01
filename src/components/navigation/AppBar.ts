import { DrawerOverlayManager } from '../../utils/ui/drawerOverlayManager';

const TPL_AppBar = document.createElement('template');

const TPL_AppBar_css = /* CSS */ `
<style>
    :host {
      z-index: 1010;
      position: fixed;

      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;

      top: 0;
      left: 0;

      width: 100%;
      backdrop-filter: blur(20px);

    }

    :host::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.8;
      background: var(--color-surface-700);
    }

    .app-bar {  
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;

        height: 4rem;
  
        padding-inline: 1rem;  
      }
</style>
`;

TPL_AppBar.innerHTML = /* HTML */ `
  ${TPL_AppBar_css}
  <div class="app-bar">
    <slot></slot>
  </div>
`;

class AppBar extends HTMLElement {
  private _overlayIsOpen: boolean;
  private _appBar: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_AppBar.content.cloneNode(true);
    shadow.append(clone);
    this._overlayIsOpen = DrawerOverlayManager.overlayIsOpen;
    this.overlayIsOpen = this._overlayIsOpen;
    this._appBar = shadow.querySelector('.app-bar')!;
  }

  static get observedAttributes() {
    return ['overlayIsOpen'];
  }

  attributeChangedCallback(attName: string, oldVal: any, newVal: any) {
    if (oldVal === newVal) return;

    switch (attName) {
      case 'overlayIsOpen':
        break;
    }
  }

  get overlayIsOpen(): string | null {
    return this.getAttribute('overlayIsOpen');
  }

  set overlayIsOpen(value: boolean) {
    this.setAttribute('overlayIsOpen', String(value));
  }

  connectedCallback() {
    window.addEventListener('overlayOpened', (event: Event) => {
      if (event instanceof CustomEvent) this.updateOverlayOpened(event);
    });

    window.addEventListener('overlayClosed', (event: Event) => {
      if (event instanceof CustomEvent) this.updateOverlayOpened(event);
    });
  }

  updateOverlayOpened(event: CustomEvent<{ overlayIsOpen: boolean }>) {
    const { overlayIsOpen } = event.detail;
    this.overlayIsOpen = overlayIsOpen;
    this.updateScrollbarPadding();
  }

  updateScrollbarPadding() {
    //
  }
}

window.customElements.define('app-bar', AppBar);

export default AppBar;
