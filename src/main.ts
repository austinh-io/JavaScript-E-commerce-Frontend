import './imports.ts';
import {
  initLightMode,
  currentTheme,
  initIconColorUpdateListener,
} from './utils/themeManager.ts';

const app = document.querySelector<HTMLDivElement>('#app');
document.querySelector('body')!.classList.add('bg-gradient');

initLightMode();

const navDrawer = document.createElement('app-drawer');
const cartDrawer = document.createElement('app-drawer');

navDrawer.drawerTitle = 'Navigation';
cartDrawer.drawerTitle = 'Cart';

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
    id="open-nav">
    Toggle Nav Drawer
  </button>

  <button
    class="btn btn-primary"
    id="open-cart">
    Toggle Cart Drawer
  </button>
`;

app!.append(navDrawer);
app!.append(cartDrawer);

document
  .querySelector('#open-nav')
  ?.addEventListener('click', () => navDrawer.toggle());

document
  .querySelector('#open-cart')
  ?.addEventListener('click', () => cartDrawer.toggle());

initIconColorUpdateListener();
