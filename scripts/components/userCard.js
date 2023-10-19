import { formatCurrency } from '/scripts/utilities/commerceUtilities.js';
('use strict');

const userCardTPL = document.createElement('template');
userCardTPL.innerHTML = `
<style>
    @import url(/css/shared.css);
    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-title);
    }

    .user-card {
        font-family: var(--font-body);
        background: var(--color-fg);
        color: var(--color-font);
        width: 500px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 10px;
        margin-bottom: 15px;
        border-bottom: SlateGray 5px solid;
    }

    .user-card img {
        width: 100%;
    }

    .user-card button {
        cursor: pointer;
        background: SlateBlue;
        color: #fff;
        border: 0;
        border-radius: 5px;
        padding: 5px 10px;
    }
</style>
<div class="user-card">
    <img/>
    <div>
        <h3><slot name="name"></slot></h3>
        <div class="info">
            <p><slot name="email" />email</p>
            <p><slot name="phone" /></p>
        </div>
        <div>
            <p>Wage: <span class="wage"></span> USD</p>
        </div>
        <button id="toggle-info">Hide Info</button>
        <p class="job"></p>
    </div>
</div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(userCardTPL.content.cloneNode(true));
    // this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    this.shadowRoot.querySelector('.wage').innerText = formatCurrency(
      this.getAttribute('wage')
    );
    this.shadowRoot.querySelector('.job').textContent =
      this.getAttribute('job');
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const toggleButton = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      info.style.display = 'block';
      toggleButton.innerText = 'Hide Info';
    } else {
      info.style.display = 'none';
      toggleButton.innerText = 'Show Info';
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector('#toggle-info')
      .addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}

window.customElements.define('user-card', UserCard);
