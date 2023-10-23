import {
  catalogProducts,
  findItem,
  formatCurrency,
} from '/scripts/utilities/commerceUtilities.js';

('use strict');

let catalogProductsButtons = undefined;
export const cartItemsList = document.querySelector('.cart-items-container');
const cartIconCounters = document.getElementsByClassName('cart-icon-counter');
const totalCostValueElement = document.querySelector('.total-cost-value');

export let cartItems = new Array();

/**
 * Sets the catalog product buttons by selecting all elements with the class 'button-product button-add'.
 * @async
 * @function
 * @returns {Promise<void>}
 */
export async function setCatalogProductButtons() {
  catalogProductsButtons = document.getElementsByClassName(
    'button-product button-add'
  );
}

/**
 * Returns an array of catalog product buttons.
 *
 * @returns {Array} An array of catalog product buttons.
 */
export function getCatalogProductButtons() {
  return catalogProductsButtons;
}

/**
 * Sets the cart items to the provided array of items.
 * @param {Array} newItems - The new array of cart items.
 */
export function setCartItems(newItems) {
  cartItems = newItems;
}

/**
 * Represents an item in the shopping cart.
 * @class
 */
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

/**
 * Updates the cart by updating the cart items count, cart subtotal, cart local storage, and cart items buttons.
 */
export function updateCart() {
  if (cartItems) {
    updateCartItemsCount();
    updateCartSubtotal();
    setCartLocalStorage();
    updateCartItemsButtons();
  }
}

/**
 * Updates the event listeners for the cart item buttons.
 * @function
 * @returns {void}
 */
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

/**
 * Updates the cart items count and displays it in the cart icon.
 */
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

/**
 * Updates the cart subtotal by calculating the total cost of all items in the cart and displaying it on the page.
 */
export function updateCartSubtotal() {
  let totalCost = cartItems.reduce((sum, cur) => sum + cur.totalPrice, 0);
  totalCostValueElement.innerText = formatCurrency(totalCost);
}

/**
 * Retrieves the cart items from local storage, or initializes an empty cart if none exists.
 */
export function getCart() {
  if (!cartItems || !localStorage.getItem('localCart')) {
    cartItems = new Array();
    setCartLocalStorage();
  } else if (localStorage.getItem('localCart')) {
    getCartLocalStorage();
  }
}

/**
 * Sets the cart items in local storage as a JSON string.
 * @function
 * @name setCartLocalStorage
 * @returns {void}
 */
export function setCartLocalStorage() {
  localStorage.setItem('localCart', JSON.stringify(cartItems));
}

/**
 * Retrieves cart items from local storage and updates the cart.
 */
export function getCartLocalStorage() {
  let localCartItems = localStorage.getItem('localCart');
  setCartItems(JSON.parse(localCartItems));
  updateCart();
}

/**
 * Fills the cart items list with the items in the cart.
 * @function
 * @returns {void}
 */
export function fillCartList() {
  if (cartItems) {
    cartItems.forEach((cartListItem) => {
      cartItemsList.insertAdjacentHTML(
        'afterbegin',
        cartItemTemplate(cartListItem)
      );
    });
  }
  updateCartItemsButtons();
}

/**
 * Adds a product to the cart.
 * @param {Event} event - The event object.
 */
export function addToCart(event) {
  getCart();

  let eventTarget = event.target;
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

/**
 * Subtracts one item from the cart for the given product and option IDs.
 * If the item count becomes zero, it removes the item from the cart.
 * @param {Event} event - The click event that triggered the function.
 */
export function subtractFromCart(event) {
  const productId = event.target.parentElement.dataset.productid;
  const optionId = event.target.parentElement.dataset.optionid;

  let itemToRemove = findItem(cartItems, productId, optionId);

  if (itemToRemove) {
    if (itemToRemove.count > 1) {
      itemToRemove.count -= 1;
      itemToRemove.totalPrice = itemToRemove.count * itemToRemove.option.price;
    } else {
      removeFromCart(itemToRemove);
    }
  }

  updateCart(); //Note: this function can be redundant since it is also called in removeFromCart() sometimes.
  //If updateCart() begins to affect performance, then I should find a way to only call this only once as opposed to twice
  //Or only update the UI elements that are necessary

  //Double note: idk if the above is still valid, but I'm leaving it in for now
  //A lot has changed since I moved towards a component and module based approach
}

/**
 * Updates the button of a catalog product with the given product ID.
 * @param {string} productId - The ID of the product to update the button for.
 */
export function updateCatalogProductButton(productId) {
  const catalogProduct = document.querySelector(
    `catalog-product[productid="${productId}"]`
  );

  if (catalogProduct) {
    catalogProduct.updateCatalogItemButton();
  }
}

/**
 * Removes a product from the cart and updates the cart UI.
 * @param {Event} event - The event object that triggered the function call.
 * @returns {void}
 */
export function removeFromCart(event) {
  let productId = undefined;
  let optionId = undefined;

  if (event.target) {
    let target = event.target.parentElement;

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

/**
 * Adds a new item to the shopping cart.
 *
 * @param {Object} cartItem - The item to add to the cart.
 * @param {string} cartItem.name - The name of the item.
 * @param {number} cartItem.price - The price of the item.
 * @param {number} cartItem.quantity - The quantity of the item.
 * @returns {void}
 */
export function addCartItem(cartItem) {
  cartItemsList.insertAdjacentHTML('afterbegin', cartItemTemplate(cartItem));
}

/**
 * Removes a cart item from the cart items list.
 * @param {string} productId - The ID of the product to remove.
 * @param {string} optionId - The ID of the option to remove.
 */
export function clearCartItem(productId, optionId) {
  let targetCartItem = document.querySelector(
    `#cart-item-${productId + optionId}`
  );
  cartItemsList.removeChild(targetCartItem);
}

/**
 * Removes all items from the cart list.
 */
export function clearCartList() {
  while (cartItemsList.firstChild) {
    cartItemsList.removeChild(cartItemsList.lastChild);
  }
}

export const cartItemTemplate = function (item) {
  return `
        <cart-item data-productid="${item.productId}" data-optionid="${item.option.optionId}"></cart-item>
  `;
};
