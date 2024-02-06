import './imports.ts';
import {
  initLightMode,
  currentTheme,
  initIconColorUpdateListener,
} from './utils/themeManager.ts';

const app = document.querySelector<HTMLDivElement>('#app');
document.querySelector('body')!.classList.add('bg-gradient');

initLightMode();

const drawer = document.createElement('app-drawer');
drawer.drawerTitle = 'Amogus';

app!.innerHTML = /* HTML */ `
  <app-bar>
    <site-nav></site-nav>
  </app-bar>
  <div>
    <example-component></example-component>
    <div class="btn-group">
      <app-button>Home</app-button>
      <button class="btn btn-secondary">
        <div class="btn-content">
          <box-icon
            type="logo"
            name="facebook-square"
            color=${currentTheme.theme.properties[
              '--color-on-secondary'
            ]}></box-icon>
          Facebook
        </div>
      </button>

      <button class="btn btn-tertiary">
        <div class="btn-content">
          <box-icon
            type="solid"
            name="hot"
            color=${currentTheme.theme.properties[
              '--color-on-tertiary'
            ]}></box-icon>
          Lorem Ipsum
        </div>
      </button>

      <button class="btn btn-primary">
        <div class="btn-content">
          <box-icon
            type="solid"
            name="color"
            color=${currentTheme.theme.properties[
              '--color-on-primary'
            ]}></box-icon>
          Lorem Ipsum
        </div>
      </button>
    </div>

    <light-toggle></light-toggle>
  </div>
  <button
    class="btn btn-primary"
    id="open-drawer">
    Toggle Drawer
  </button>
`;

app!.append(drawer);

document
  .querySelector('#open-drawer')
  ?.addEventListener('click', () => drawer.toggle());

initIconColorUpdateListener();
