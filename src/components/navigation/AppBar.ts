import { currentTheme } from '../../utils/themeManager';

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
    }

    .app-bar {  
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;

        height: 4rem;
  
        padding-inline: 1rem;
  
        background-color: var(--color-surface-700);
      }
</style>
`;

TPL_AppBar.innerHTML = /* HTML */ `
  ${TPL_AppBar_css}
  <div class="app-bar"></div>
`;

class AppBar extends HTMLElement {
  private _appBar: HTMLElement;
  private _siteNav: Element;
  private _sideDrawer: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_AppBar.content.cloneNode(true);
    shadow.append(clone);

    this._siteNav = document.createElement('site-nav');
    this._sideDrawer = document.createElement('side-drawer');

    this._appBar = shadow.querySelector('.app-bar')!;

    this._appBar.append(this._siteNav);
    this._appBar.append(this._sideDrawer);
  }

  connectedCallback() {}
}

window.customElements.define('app-bar', AppBar);

export default AppBar;
