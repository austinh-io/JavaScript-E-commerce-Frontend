import AppDrawer from './components/navigation/AppDrawer';
import { currentTheme } from './utils/themeManager';
import AppBar from './components/navigation/AppBar.ts';
import { SiteNav } from './components/navigation/SiteNav.ts';
import { createButton } from './utils/elementCreator.ts';
import CartMenu from './components/cart/CartMenu.ts';
import CartCard from './components/cart/CartCard.ts';

export const app = document.createElement('div');
export const appHTML = document.createElement('template');

const navDrawer = new AppDrawer('Navigation');
const cartDrawer = new AppDrawer('Cart');
const cartMenu = new CartMenu();
cartDrawer.appendToDrawerContent(cartMenu);

const cartItem1 = new CartCard();
const cartItem2 = new CartCard();
const cartItem3 = new CartCard();
const cartItem4 = new CartCard();

function appendCartItems() {
  const timer = [2000, 4000, 6000, 8000];
  const cartItems = [cartItem1, cartItem2, cartItem3, cartItem4];

  for (let i = 0; i < timer.length; i++) {
    setTimeout(() => {
      cartMenu.appendToCart(cartItems[i]);
    }, timer[i]);
  }
}

const appDrawers: { [key: string]: AppDrawer } = {
  navigation: navDrawer,
  cart: cartDrawer,
};

for (const property in appDrawers) {
  app.append(appDrawers[property]);
}

const appBar = new AppBar();
const siteNav = new SiteNav(appDrawers);

appBar.append(siteNav);
app.append(appBar);

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

appendCartItems();

app.append(cartMenu);

const buttonToggleCart = createButton(
  'Toggle Cart',
  () => cartDrawer.toggle(),
  'primary'
);

const buttonToggleNav = createButton(
  'Toggle Nav',
  () => navDrawer.toggle(),
  'secondary'
);

app.appendChild(buttonToggleCart);
app.appendChild(buttonToggleNav);

document
  .querySelector('#open-nav')
  ?.addEventListener('click', () => navDrawer.toggle());

document
  .querySelector('#open-cart')
  ?.addEventListener('click', () => cartDrawer.toggle());
