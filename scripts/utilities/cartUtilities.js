'use strict';

const catalogProductsButtons = document.getElementsByClassName(
  'button-product button-add'
);
const cartItemsList = document.querySelector('.cart-items-container');
const cartIconCounters = document.getElementsByClassName('cart-icon-counter');
const totalCostValueElement = document.querySelector('.total-cost-value');

const catalogItemButtonText_Enabled = 'Add to Cart';
const catalogItemButtonText_Disabled = 'Item in Cart';

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
  updateCartItemsCount();
  updateCartSubtotal();
  updateCatalogItemsCartButtons();
  setCartLocalStorage();
}

export function updateCartItemsCount() {
  let totalItems = cartItems.reduce((sum, cur) => sum + cur.count, 0);
  for (let i = 0; i < cartIconCounters.length; i++) {
    cartIconCounters[i].innerText = totalItems;
  }
  if (cartItems.length > 0) {
    for (let i = 0; i < cartIconCounters.length; i++) {
      cartIconCounters[i].classList.remove('hidden');
    }
  } else {
    for (let i = 0; i < cartIconCounters.length; i++) {
      cartIconCounters[i].classList.add('hidden');
    }
  }
}

export function updateCartSubtotal() {
  let totalCost = cartItems.reduce((sum, cur) => sum + cur.totalPrice, 0);
  totalCostValueElement.innerText = formatCurrency(totalCost);
}

export function updateCatalogItemsCartButtons() {
  for (let i = 0; i < catalogProductsButtons.length; i++) {
    if (
      findItem(
        cartItems,
        catalogProductsButtons[i].parentElement.dataset.productid,
        catalogProductsButtons[i].parentElement.dataset.optionid
      )
    ) {
      catalogProductsButtons[i].disabled = true;
      catalogProductsButtons[i].innerText = catalogItemButtonText_Disabled;
    } else {
      catalogProductsButtons[i].disabled = false;
      catalogProductsButtons[i].innerText = catalogItemButtonText_Enabled;
    }
  }
}

export function setCartLocalStorage() {
  localStorage.setItem('localCart', JSON.stringify(cartItems));
}

export function getCartLocalStorage() {
  let localCartItems = localStorage.getItem('localCart');
  setCartItems(JSON.parse(localCartItems));
  updateUi();
  fillCartList();
}

export function fillCartList() {
  cartItems.forEach((cartListItem) => {
    cartItemsList.insertAdjacentHTML(
      'afterbegin',
      cartItemTemplate(cartListItem)
    );
  });
}

function addToCart(event) {
  let eventTarget = event.target.parentElement;

  let productId = eventTarget.dataset.productid;

  let productOptionId = eventTarget.dataset.optionid;

  let targetProduct = catalogProducts.find(
    (product) => product.productId == productId
  );

  let productOptionToAdd = targetProduct.options.find(
    (productOption) => productOption.optionId == productOptionId
  );

  let cartItemToAdd = findItem(cartItems, productId, productOptionId);

  if (cartItemToAdd) {
    cartItemToAdd.count += 1;
    cartItemToAdd.totalPrice = cartItemToAdd.count * cartItemToAdd.option.price;
    updateCartItem(cartItemToAdd);
  } else {
    const newItem = new cartItem(
      productId + productOptionId,
      productId,
      productOptionToAdd,
      1,
      productOptionToAdd.price,
      targetProduct.title
    );
    cartItems.push(newItem);
    addCartItem(newItem);
  }

  updateUi();
}

export function subtractFromCart(event) {
  const productId = event.target.parentElement.dataset.productid;
  const optionId = event.target.parentElement.dataset.optionid;

  let itemToRemove = findItem(cartItems, productId, optionId);

  if (itemToRemove) {
    if (itemToRemove.count > 1) {
      itemToRemove.count -= 1;
      itemToRemove.totalPrice = itemToRemove.count * itemToRemove.option.price;
      updateCartItem(itemToRemove);
    } else {
      removeFromCart(itemToRemove);
    }
  }

  updateUi(); //Note: this function can be redundant since it is also called in removeFromCart() sometimes.
  //If updateUi() begins to affect performance, then I should find a way to only call this only once as opposed to twice
  //Or only update the UI elements that are necessary
}

export function removeFromCart(event) {
  if (event.target) {
    const targetProductId = event.target.parentElement.dataset.productid;
    const targetOptionId = event.target.parentElement.dataset.optionid;

    clearCartItem(targetProductId, targetOptionId);

    let targetItem = findItem(cartItems, targetProductId, targetOptionId);
    cartItems.splice(cartItems.indexOf(targetItem), 1);
  } else {
    clearCartItem(event.productId, event.option.optionId);
    cartItems.splice(cartItems.indexOf(event), 1);
  }

  updateUi();
}
