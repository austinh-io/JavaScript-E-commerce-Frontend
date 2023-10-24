import { baseUrl } from '/scripts/utilities/commerceUtilities.js';
('use strict');

class JSymbol extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') {
      this.updateIcon();
    }
  }

  updateIcon() {
    const iconName = this.getAttribute('name');
    let iconSize = this.getAttribute('size');

    if (!iconSize) iconSize = '2rem';

    let strokeColor = 'var(--color-font)';
    let fillColor = 'none';

    if (iconName === 'store-logo') {
      strokeColor = 'none';
      fillColor = 'var(--color-font)';
    }

    this.innerHTML = `
      <style>
        .icon {
          stroke: ${strokeColor};
          fill: ${fillColor};

          width: ${iconSize};
          height: ${iconSize};
        }
      </style>
      <svg class="icon">
        <use xlink:href="${baseUrl}/assets/icons.svg#${iconName}"></use>
      </svg>
    `;
  }

  connectedCallback() {
    this.updateIcon();
  }
}

window.customElements.define('j-symbol', JSymbol);
