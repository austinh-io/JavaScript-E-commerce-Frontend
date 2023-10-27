import {
  catalogProducts,
  findItem,
} from '/scripts/utilities/commerceUtilities.js';

('use strict');

export const storeCartMenu = document.querySelector('store-cart');
export const navMenu = document.querySelector('nav-menu');

export let cartItems = new Array();

export function setCartItems(newItems) {
  cartItems = newItems;
}

export class cartItem {
  constructor(id, productId, option, count, totalPrice, title) {
    this.id = id;
    this.productId = productId;
    this.option = option;
    this.count = count;
    this.totalPrice = totalPrice;
    this.title = title;
  }
}

export function updateCart() {
  if (cartItems) {
    updateCartItemsCount();
    updateCartSubtotal();
    setCartLocalStorage();
    updateCartItemsButtons();
    updateProductPageButton();
  }

  if (cartItems.length <= 0) {
    storeCartMenu.disableCheckoutButton();
  } else {
    storeCartMenu.enableCheckoutButton();
  }
}

export function updateProductPageButton() {
  const productPageAddToCartButton = document.querySelector('.button-add');

  if (productPageAddToCartButton) {
    const productId = productPageAddToCartButton.dataset.productid;
    const optionId = productPageAddToCartButton.dataset.optionid;
    if (findItem(cartItems, productId, optionId)) {
      disableCatalogItemButton(productPageAddToCartButton);
    } else {
      enableCatalogItemButton(productPageAddToCartButton);
    }
  }
}

function enableCatalogItemButton(productButton) {
  productButton.disabled = false;
  productButton.textContent = 'Add to Cart';
}

function disableCatalogItemButton(productButton) {
  productButton.disabled = true;
  productButton.textContent = 'Item in Cart';
}

export function updateCartItemsButtons() {
  let removeButtons = document.querySelectorAll('.button-cart.button-remove');
  let subtractButtons = document.querySelectorAll(
    '.button-cart.button-subtract'
  );
  let addButtons = document.querySelectorAll('.button-cart.button-add');

  removeButtons.forEach((button) =>
    button.addEventListener('click', removeFromCart)
  );
  subtractButtons.forEach((button) =>
    button.addEventListener('click', subtractFromCart)
  );
  addButtons.forEach((button) => button.addEventListener('click', addToCart));
}

export function updateCartItemsCount() {
  let totalItems = cartItems.reduce((sum, cur) => sum + cur.count, 0);
  navMenu.updateCartIconCounter(totalItems);
}

export function updateCartSubtotal() {
  let totalCost = cartItems.reduce((sum, cur) => sum + cur.totalPrice, 0);
  storeCartMenu.updateSubtotal(totalCost);
}

export function getCart() {
  if (!cartItems || !localStorage.getItem('localCart')) {
    cartItems = new Array();
    setCartLocalStorage();
  } else if (localStorage.getItem('localCart')) {
    getCartLocalStorage();
  }
}

export function setCartLocalStorage() {
  localStorage.setItem('localCart', JSON.stringify(cartItems));
}

export function getCartLocalStorage() {
  let localCartItems = localStorage.getItem('localCart');
  setCartItems(JSON.parse(localCartItems));
  updateCart();
}

export function fillCartList() {
  if (!cartItems) {
    getCart();
  }
  cartItems.forEach((cartListItem) => {
    storeCartMenu.addCartItem(cartItemTemplate(cartListItem));
  });
  updateCartItemsButtons();
}

export function addToCart(event) {
  getCart();

  let eventTarget = event.target.closest('.button-add');

  let { productid: productId, optionid: optionId } = eventTarget.dataset;

  if (!productId) {
    eventTarget = eventTarget.parentElement;
    ({ productid: productId, optionid: optionId } = eventTarget.dataset);
  }

  let targetProductIndex = catalogProducts.findIndex(
    (product) => product.productId == productId
  );

  let targetProductOptionIndex = catalogProducts[
    targetProductIndex
  ].options.findIndex((productOption) => productOption.optionId == optionId);

  let cartItemToAdd = findItem(cartItems, productId, optionId);

  if (cartItemToAdd) {
    cartItemToAdd.count += 1;
    cartItemToAdd.totalPrice = cartItemToAdd.count * cartItemToAdd.option.price;
  } else {
    const newItem = new cartItem(
      productId + optionId,
      productId,
      catalogProducts[targetProductIndex].options[targetProductOptionIndex],
      1,
      catalogProducts[targetProductIndex].options[
        targetProductOptionIndex
      ].price,
      catalogProducts[targetProductIndex].title
    );
    cartItems = [...cartItems, newItem];
    addCartItem(newItem);
  }

  updateCart();
}

export function subtractFromCart(event) {
  let targetButton = event.target.closest('.button-cart.button-subtract');

  const productId = targetButton.dataset.productid;
  const optionId = targetButton.dataset.optionid;

  let itemToRemove = findItem(cartItems, productId, optionId);

  if (itemToRemove) {
    if (itemToRemove.count > 1) {
      itemToRemove.count -= 1;
      itemToRemove.totalPrice = itemToRemove.count * itemToRemove.option.price;
    } else {
      removeFromCart(itemToRemove);
    }
  }

  updateCart();
}

export function updateCatalogProductButton(productId) {
  const catalogProduct = document.querySelector(
    `catalog-product[productid="${productId}"]`
  );

  if (catalogProduct) {
    catalogProduct.updateCatalogItemButton();
  }
}

export function removeFromCart(event) {
  let productId = undefined;
  let optionId = undefined;

  if (event.target) {
    let target = event.target;

    if (!target.matches('.button-cart.button-remove'))
      target = target.closest('.button-cart.button-remove');

    productId = target.dataset.productid;
    optionId = target.dataset.optionid;

    clearCartItem(productId, optionId);

    let targetItem = findItem(cartItems, productId, optionId);
    cartItems.splice(cartItems.indexOf(targetItem), 1);
  } else {
    productId = event.productId;
    optionId = event.option.optionId;

    clearCartItem(productId, optionId);
    cartItems.splice(cartItems.indexOf(event), 1);
  }

  updateCatalogProductButton(productId);

  updateCart();
}

export function addCartItem(cartItem) {
  storeCartMenu.addCartItem(cartItemTemplate(cartItem));
}

export function clearCartItem(productId, optionId) {
  storeCartMenu.removeCartItem(productId, optionId);
}

export const cartItemTemplate = function (item) {
  return `
        <cart-item data-productid="${item.productId}" data-optionid="${item.option.optionId}"></cart-item>
  `;
};
