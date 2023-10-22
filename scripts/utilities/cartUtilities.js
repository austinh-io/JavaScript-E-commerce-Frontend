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

let addToCartButtons = new Array();

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
  // let removeButtons = document.getElementsByClassName(
  //   'button-cart button-remove'
  // );

  // let subtractButtons = document.getElementsByClassName(
  //   'button-cart button-subtract'
  // );

  // let addButtons = document.getElementsByClassName('button-cart button-add');

  // for (let removeButton of removeButtons) {
  //   removeButton.addEventListener('click', removeFromCart);
  // }

  // for (let subtractButton of subtractButtons) {
  //   subtractButton.addEventListener('click', subtractFromCart);
  // }

  // for (let addButton of addButtons) {
  //   addButton.addEventListener('click', addToCart);
  // }

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
  let productId = eventTarget.getAttribute('productid');
  let productOptionId = eventTarget.getAttribute('productoptionid');

  if (!productId) {
    eventTarget = event.target.parentElement;
    productId = eventTarget.dataset.productid;
    productOptionId = eventTarget.dataset.optionid;
  }

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
      updateCartItem(itemToRemove);
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
    let target = event.target;

    if (!target.matches('.button-cart.button-remove'))
      target = target.closest('.button-cart.button-remove');

    productId = target.dataset.productid;
    optionId = target.dataset.optionid;

    clearCartItem(productId, optionId);

    let targetItem = findItem(cartItems, productId, optionId);
    cartItems.splice(cartItems.indexOf(targetItem), 1);
  } else {
    console.log('B');

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

  // console.log(productId);
  // console.log(optionId);
  // console.log(targetCartItem);
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

/**
 * Updates the count and total price of a cart item in the DOM.
 * @param {Object} cartItem - The cart item to update.
 * @param {string} cartItem.productId - The ID of the product.
 * @param {Object} cartItem.option - The selected product option.
 * @param {string} cartItem.option.optionId - The ID of the selected option.
 * @param {number} cartItem.count - The updated count of the cart item.
 * @param {number} cartItem.totalPrice - The updated total price of the cart item.
 */
export function updateCartItem(cartItem) {
  let cartItemElement = document.getElementById(
    `cart-item-${cartItem.productId + cartItem.option.optionId}`
  );

  cartItemElement.querySelector('.cart-item-count').innerText = cartItem.count;
  cartItemElement.querySelector('.cart-item-price').children[0].innerText =
    formatCurrency(cartItem.totalPrice);
}

/**
 * Returns a string containing the HTML template for a cart item.
 *
 * @param {Object} item - The cart item object.
 * @param {string} item.productId - The ID of the product.
 * @param {Object} item.option - The selected option object.
 * @param {string} item.option.optionId - The ID of the selected option.
 * @param {string} item.option.imageName - The name of the image file for the selected option.
 * @param {string} item.title - The title of the product.
 * @param {string} item.option.optionStyle - The selected style option.
 * @param {string} item.option.optionSize - The selected size option.
 * @param {number} item.count - The quantity of the product in the cart.
 * @param {number} item.totalPrice - The total price of the product in the cart.
 *
 * @returns {string} The HTML template for a cart item.
 */
export const cartItemTemplate = function (item) {
  return `
        <div
          class="cart-item-container"
          data-productId="${item.productId}"
          data-optionid="${item.option.optionId}"
          id="cart-item-${item.productId + item.option.optionId}"
        >
          <div class="cart-item-col1">
            <img
              src="/assets/images/productImages/small/${
                item.option.imageName
              }_small.webp/"
              class="cart-item-image"
            />
          </div>
          <div class="cart-item-col2">
            <div class="cart-item-title">${item.title}</div>
            <div class="cart-item-option-label">Style: ${
              item.option.optionStyle
            }</div>
            <div class="cart-item-option-label">Size: ${
              item.option.optionSize
            }</div>

            <div
              class="cart-item-buttons-container"
            >
              <button
                class="button-cart button-add"
                data-productId="${item.productId}"
                data-optionid="${item.option.optionId}"
              >
              <span class="material-symbols-outlined button-cart-icon">
              add
              </span>
              </button>

              <div class="cart-item-count">${item.count}</div>

              <button
                class="button-cart button-subtract"
                data-productId="${item.productId}"
                data-optionid="${item.option.optionId}"
              >
              <span class="material-symbols-outlined button-cart-icon">
              remove
              </span>
              </button>
            </div>
          </div>
          <div class="cart-item-col3">
            <button
              class="button-cart button-remove"
              data-productId="${item.productId}"
              data-optionid="${item.option.optionId}"
            >
              <span class="material-symbols-outlined"> delete </span>
            </button>

            <div class="cart-item-price">
              <span>${formatCurrency(item.totalPrice)}</span>
            </div>
          </div>
        </div>
  `;
};
