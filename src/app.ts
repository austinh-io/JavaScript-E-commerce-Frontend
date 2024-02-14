import { Catalog } from './utils/core/catalogManager.ts';
import AppDrawer from './components/overscreen_menus/AppDrawer.ts';
import AppOverlay from './components/overscreen_menus/AppOverlay.ts';
import SiteNav from './components/navigation/SiteNav.ts';
import { createButton } from './utils/ui/elementCreator.ts';
import AppBar from './components/navigation/AppBar.ts';
import CartMenu from './components/cart/CartMenu.ts';
import { DrawerOverlayManager } from './utils/ui/drawerOverlayManager.ts';
import CatalogCard from './components/catalog/CatalogCard.ts';

export const app = document.createElement('div');
export const appHTML = document.createElement('template');

const drawers: { [key: string]: AppDrawer } = {
  navigation: new AppDrawer('Navigation'),
  cart: new AppDrawer('Cart'),
};
const drawerOverlay = new AppOverlay(drawers);

const appBar = new AppBar();
const siteNav = new SiteNav();
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
      <app-button
        iconName="yelp"
        iconType="logo"
        >Home</app-button
      >
      <app-button
        iconName="windows"
        iconType="logo"
        type="secondary"></app-button>

      <app-button
        iconName="windows"
        iconType="logo"
        type="secondary"
        size="sm"></app-button>

      <app-button
        iconName="windows"
        iconType="logo"
        type="secondary"
        size="lg"></app-button>

      <app-button type="tertiary">Test</app-button>

      <app-button
        iconName="windows"
        iconType="logo"
        type="secondary"
        size="lg"
        >Windows 11</app-button
      >
      <app-button
        type="tertiary"
        size="sm"
        >Test</app-button
      >
    </div>

    <light-toggle></light-toggle>
  </div>
`;

export function initTesting() {
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

  DrawerOverlayManager.getDrawer('cartDrawer').open();

  const catalogItems = document.createElement('div');
  const allCatalogProducts = Catalog.getAllItems();

  function populateCatalog() {
    for (const key in allCatalogProducts) {
      const catalogCard = new CatalogCard(Catalog.getItem(key));
      catalogItems.append(catalogCard);
    }

    catalogItems.style.display = 'flex';
    catalogItems.style.flexWrap = 'wrap';
    catalogItems.style.gap = '10px';

    app.append(catalogItems);
  }

  populateCatalog();
}
