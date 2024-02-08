import AppDrawer from './components/overscreen_menus/AppDrawer.ts';
import { currentTheme } from './utils/themeManager';
import AppBar from './components/navigation/AppBar.ts';
import { SiteNav } from './components/navigation/SiteNav.ts';
import { createButton } from './utils/elementCreator.ts';
import CartMenu from './components/cart/CartMenu.ts';
import CartCard from './components/cart/CartCard.ts';
import AppOverlay from './components/overscreen_menus/AppOverlay.ts';

export const app = document.createElement('div');
export const appHTML = document.createElement('template');

const drawers: { [key: string]: AppDrawer } = {
  navigation: new AppDrawer('Navigation'),
  cart: new AppDrawer('Cart'),
};
const drawerOverlay = new AppOverlay(drawers);

const appBar = new AppBar();
const siteNav = new SiteNav(drawers, drawerOverlay);
appBar.append(siteNav);

const cartMenu = new CartMenu();

drawers.cart.appendToDrawerContent(cartMenu);

app.append(appBar);
app.append(drawerOverlay);

for (const drawer in drawers) {
  app.append(drawers[drawer]);
}

appHTML.innerHTML = /* HTML */ `
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
`;

function initTesting() {
  const buttonToggleCart = createButton(
    'Toggle Cart',
    () => drawers.cart.toggle(),
    'primary'
  );

  const buttonToggleNav = createButton(
    'Toggle Nav',
    () => drawers.navigation.toggle(),
    'secondary'
  );

  app.append(buttonToggleCart);
  app.append(buttonToggleNav);

  function appendCartItems() {
    const cartItem1 = new CartCard();
    const cartItem2 = new CartCard();
    const cartItem3 = new CartCard();
    const cartItem4 = new CartCard();

    const timer = [2000, 4000, 6000, 8000];
    const cartItems = [cartItem1, cartItem2, cartItem3, cartItem4];

    for (let i = 0; i < timer.length; i++) {
      setTimeout(() => {
        cartMenu.appendToCart(cartItems[i]);
      }, timer[i]);
    }
  }

  appendCartItems();
}

initTesting();
