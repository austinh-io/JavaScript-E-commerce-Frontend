const TPL_CartCard = document.createElement('template');

const TPL_CartCard_css = /* CSS */ `
<style>

    :host {
        overflow: hidden;
        border-radius: 4px;

    }
    .container {
        position: relative;

        width: 100%;
        height: 5rem;

        padding: 1.2rem;
    }

    .container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.4;
        background: var(--color-surface-400);
    }

    .cart-card-image-container {
        width: 4rem;
        height: 4rem;
        background: var(--color-tertiary-500);
        opacity: 0.5;
    }

    h1, h2, h3, h4, h5, h6, p {
        margin: 0;
        padding: 0;
    }

    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
        gap: 1rem;
        align-items: center;
        justify-content: center;
    }

    .grid-item {

    }
</style>
`;

TPL_CartCard.innerHTML = /* HTML */ `
  ${TPL_CartCard_css}

  <div class="container grid-container">
    <div class="grid-item">
      <div class="cart-card-image-container"></div>
    </div>
    <div class="grid-item">
      <h4>Cart Item</h4>
      <p>Lorem Ipsum</p>
      <p>$0.00</p>
    </div>
    <div class="grid-item">
      <button
        class="btn btn-primary"
        part="btn btn-primary">
        Remove from Cart
      </button>
    </div>
  </div>
`;

class CartCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_CartCard.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {}
}

window.customElements.define('cart-card', CartCard);

export default CartCard;
