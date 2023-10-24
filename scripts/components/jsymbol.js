import { baseUrl } from '/scripts/utilities/commerceUtilities.js';

/**
 * A custom element that displays an SVG icon.
 *
 * @extends HTMLElement
 */
class JSymbol extends HTMLElement {
  /**
   * An array of attribute names to observe for changes.
   *
   * @returns {Array} An array of attribute names.
   */
  static get observedAttributes() {
    return ['name', 'size'];
  }

  /**
   * Called when an observed attribute has been added, removed, updated, or replaced.
   *
   * @param {string} name - The name of the attribute that was changed.
   * @param {string} oldValue - The previous value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') {
      this.updateIcon();
    }
  }

  /**
   * Updates the icon based on the current attribute values.
   */
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

  /**
   * Called when the element is added to the DOM.
   */
  connectedCallback() {
    this.updateIcon();
  }
}

window.customElements.define('j-symbol', JSymbol);
