const TPL_NavBar = document.createElement('template');

const TPL_NavBar_css = /* CSS */ `
<style>
    :host {
      z-index: 1010;
      position: fixed;

      top: 0;
      left: 0;
      width: 100%;      

      --nav-height: 1.4rem;
    }
    nav {
      display: flex;
      align-items: center;

      height: var(--nav-height);

      padding: 1rem;

      background-color: var(--color-surface-900);
    }

    ul {
      display: flex;
      gap: 1rem;


      list-style: none;
    }

    a {
      color: var(--theme-font-color-base);
      text-decoration: none;
    }

    a:hover {
      color: var(--color-primary-300);
    }

    .wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-inline: auto;

      width: 100%;
      max-width: 1240px;
    }
</style>
`;

TPL_NavBar.innerHTML = /* HTML */ `
  ${TPL_NavBar_css}

  <nav>
    <div class="wrapper">
      <h3>Navigation Component</h3>
      <ul>
        <li>
          <a href="#">Link 1</a>
        </li>
        <li>
          <a href="#">Link 2</a>
        </li>
        <li>
          <a href="#">Link 3</a>
        </li>
      </ul>
    </div>
  </nav>
`;

class NavBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_NavBar.content.cloneNode(true);
    shadow.append(clone);
  }

  connectedCallback() {}
}

window.customElements.define('nav-bar', NavBar);

export default NavBar;
