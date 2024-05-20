import { baseUrl } from '/js-simple-e-com/scripts/utilities/commerceUtilities.js';

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

    let strokeColor = 'var(--color-font)';
    let fillColor = 'none';

    if (iconName === 'store-logo') {
      strokeColor = 'none';
      fillColor = 'var(--color-font)';
    }

    this.innerHTML = `
      <style>

      a.nav-site-logo:hover {      
        .icon {
          fill: var(--color-accent);
          stroke: var(--color-accent);
          color: var(--color-accent);
        }
      }

        .icon {
          stroke: ${strokeColor};
          fill: ${fillColor};

          width: 2rem;
          height: 2rem;
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
