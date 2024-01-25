import './css/app.css';
import './css/global.css';
import './components.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /* HTML */ `
  <div>
    <example-component></example-component>
    <div class="btn-group">
      <example-button></example-button>
      <button class="btn btn-secondary">
        <box-icon
          type="logo"
          name="facebook-square"></box-icon>
        Facebook
      </button>

      <button class="btn btn-tertiary">
        <box-icon
          type="solid"
          name="hot"></box-icon>
        Lorem Ipsum
      </button>
    </div>

    <theme-toggle></theme-toggle>
  </div>
`;
