import { baseUrl } from '/scripts/utilities/commerceUtilities.js';

import {
  addToCart,
  cartItems,
  storeCartMenu,
  removeFromCart,
  subtractFromCart,
  updateCatalogProductButton,
  fillCartList,
  getCartLocalStorage,
} from '../utilities/cartUtilities.js';
('use strict');

const tpl_navMenu = document.createElement('template');

/**
 * CSS template string for the product card component.
 * @type {string}
 */
const tpl_navMenuCSS = `
  <style>
    @import url(${baseUrl}/css/main.css);

    :host {
      /*Uncomment the height below if you want all cards to be the same height, as they currently
      can be shorter or taller if they have more or less options. Right now the image will grow as the
      card grows, so if that bothers you then turn this on.*/

      /*height: 100%;*/
      /*width: 100%;*/
    }

    ul {
      list-style: none;
    }
    
    .wrapper {
      padding-inline: 2%;
      margin-inline: auto;
      max-width: 1920px;
    }

    /* ----- Header ----- */

    .header-container {
      z-index: 900;

      position: fixed;

      display: flex;
      align-items: center;
      width: 100%;
      height: var(--header-height);

      background-color: var(--color-bg-trans);
      backdrop-filter: blur(20px);
    }

    .header-container .container {
      width: 100%;
    }

    /* --- Navigation --- */

    .nav-container {
      width: 100%;
    }
    
    .nav-container ul {
      position: relative;
      display: flex;
      align-items: center;
      gap: 1.2rem;
    }
    
    .cart-menu-toggle {
      position: relative;
      z-index: 900;
      top: 0;
    
      background-color: rgba(0, 0, 0, 0);
    
      border: none;
    
      cursor: pointer;
      transition: all 0.15s ease-out;
    }

    .cart-menu-toggle:hover {
      top: -3px;
    }

    .cart-menu-toggle:hover .cart-icon-counter{
      background-color: var(--color-accent);
      outline-color: var(--color-accent);
      color: var(--color-font);
    }

    .cart-menu-toggle:hover div.cart-icon-container svg {
      stroke: var(--color-accent);
    }
    
    .cart-icon-container {
      position: relative;
    }
    
    .cart-icon-counter {
      position: absolute;
      bottom: 2px;
      right: -2px;
    
      display: flex;
      align-items: center;
      justify-content: center;
    
      background-color: var(--color-font);
      outline: 0.15rem solid var(--color-font);
      color: var(--color-fg);
      font-family: var(--font-body);
      font-weight: 600;
      font-size: 0.9rem;
    
      width: 0.8rem;
      height: 0.8rem;
    
      border-radius: 50%;
    }
    
    /* -- Logo/Business Name -- */
    
    .nav-site-logo {
      display: flex;
      align-items: center;
      justify-content: center;
    
      margin-right: auto;
    
      cursor: pointer;
    }

    a.nav-site-logo:hover {
      .nav-logo-text {
        color: var(--color-accent);
      }
    }
    
    .nav-logo-container {
      display: flex;
      align-items: center;
      justify-content: center;
    
      width: 2.2rem;
      height: 2.2rem;
      margin-right: 0.4rem;
      padding-top: 0.2rem;
    }
    
    .nav-logo-text {
      display: flex;
      align-items: center;
      justify-content: center;
    
      font-size: 1.6rem;
    
      text-transform: uppercase;
      font-weight: 400;
      letter-spacing: 0.2ch;
    }
    
    .nav-buttons-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: auto;
      gap: 1rem;
    }

  /*------- Theme Switch -------*/

  .checkbox {
    display: none;
  }

  .theme-toggle-switch {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.8rem;
    height: 2rem;
  }

  .switch-label {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: 0;
    left: 0;

    width: 3.8rem;
    height: 2rem;

    border-radius: 15px;
    background: var(--color-fg);
    outline: rgba(0, 0, 0, 0) solid 2px;

    cursor: pointer;

    transition: background-color 0.2s ease-out, outline 0.2s ease-out;
  }

  .switch-label:hover {
    outline: var(--color-accent) solid 2px ;
  }

  .switch-label::before {    
    content: '';

    position: absolute;
    right: 50%;

    width: 1.8rem;
    height: 1.8rem;

    background: var(--color-aux-bg);
    border-radius: 50%;

    transition: transform 0.2s ease-out;
  }

  .checkbox:checked + .switch-label::before {
    transform: translateX(100%);
  }

  j-symbol.theme-toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-toggle-icon svg{
    width: 1.2rem;
    height: 1.2rem;
    z-index: 1;
    stroke: var(--color-fg-alt)
  }

  .theme-toggle-icon-dark {
    position: relative;
    right: .3rem;
  }

  .theme-toggle-icon-light {
    position: relative;
    left: .3rem;
  }

  .active-theme svg {
    stroke: var(--color-aux);
    fill: var(--color-aux);
  }
  </style>
`;

tpl_navMenu.innerHTML = `
  ${tpl_navMenuCSS}
  <div
    class="header-container menu-horizontal-from-left-mobile"
    data-visible="false"
  >
    <nav class="nav-container wrapper">
      <ul class="nav-menu">
        <a
          class="nav-site-logo"
          href="index.html"
        >
          <div class="nav-logo-container">
            <j-symbol name="store-logo"></j-symbol>
          </div>
          <div class="nav-logo-text">Lorem Ipsum</div>
        </a>

        <li><a>Page 1</a></li>
        <li><a>Page 2</a></li>
        <li><a>Page 3</a></li>

        <div class="nav-buttons-container">
          <div class="theme-toggle-switch">
            <input type="checkbox" id="theme-switch" class="checkbox">
            <label for="theme-switch" class="switch-label">
              <j-symbol
                class="theme-toggle-icon theme-toggle-icon-dark"
                name="half-moon"
              ></j-symbol>
              <j-symbol
                class="theme-toggle-icon theme-toggle-icon-light"
                name="sun"
              ></j-symbol>
            </label>
          </div>

          <button
            class="cart-menu-toggle cart-menu-toggle-open"
            aria-controls="cart-menu"
            aria-expanded="false"
          >
            <div class="cart-icon-container">
              <j-symbol name="shopping-bag"></j-symbol>
              <span class="cart-icon-counter hidden"></span>
            </div>
          </button>
        </div>
      </ul>
    </nav>
  </div>
  
`;

class navMenu extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = tpl_navMenu.content.cloneNode(true);
    shadow.append(clone);

    this.cartIconCounter = shadow.querySelector('.cart-icon-counter');
  }

  updateCartIconCounter = (count) => {
    if (count > 0) {
      this.cartIconCounter.classList.remove('hidden');
      this.cartIconCounter.textContent = count;
    } else {
      this.cartIconCounter.classList.add('hidden');
    }
  };

  connectedCallback() {
    getCartLocalStorage();
    fillCartList();
  }
}

window.customElements.define('nav-menu', navMenu);
