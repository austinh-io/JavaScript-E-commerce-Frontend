import './components.ts';
import './css/main.css';
import './css/global.css';
import { initLightMode, currentTheme } from './utils/themeManager.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = /* HTML */ `
  <div>
    <example-component></example-component>
    <div class="btn-group">
      <example-button>Home</example-button>
      <button class="btn btn-secondary">
        <box-icon
          type="logo"
          name="facebook-square"
          color=${currentTheme.theme.properties[
            '--color-on-secondary'
          ]}></box-icon>
        Facebook
      </button>

      <button class="btn btn-tertiary">
        <box-icon
          type="solid"
          name="hot"
          color=${currentTheme.theme.properties[
            '--color-on-tertiary'
          ]}></box-icon>
        Lorem Ipsum
      </button>

      <button class="btn btn-primary">
        <box-icon
          type="solid"
          name="color"
          color=${currentTheme.theme.properties[
            '--color-on-primary'
          ]}></box-icon>
        Lorem Ipsum
      </button>
    </div>

    <light-mode-toggle></light-mode-toggle>
  </div>
`;

initLightMode();
