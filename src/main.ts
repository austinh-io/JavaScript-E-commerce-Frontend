import './components.ts';
import './css/main.css';
import './css/global.css';
import { initLightMode } from './utils/themeManager.ts';

initLightMode();

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

      <button class="btn btn-primary">
        <box-icon
          type="solid"
          name="color"></box-icon>
        Lorem Ipsum
      </button>
    </div>

    <light-mode-toggle></light-mode-toggle>
  </div>
`;
