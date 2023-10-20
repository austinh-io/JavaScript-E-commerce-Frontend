import {
  catalogProducts,
  findItem,
  formatCurrency,
} from '/scripts/utilities/commerceUtilities.js';

('use strict');

const catalogProductsButtons = document.getElementsByClassName(
  'button-product button-add'
);
const cartItemsList = document.querySelector('.cart-items-container');
const cartIconCounters = document.getElementsByClassName('cart-icon-counter');
const totalCostValueElement = document.querySelector('.total-cost-value');

let addToCartButtons = new Array();

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
  }
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

export function getCart() {
  if (!cartItems || !localStorage.getItem('localCart')) {
    cartItems = new Array();
    setCartLocalStorage();
  } else if (localStorage.getItem('localCart')) {
    getCartLocalStorage();
  }
}

export function setCartLocalStorage() {
  // localStorage.setItem('localCart', JSON.stringify(cartItems));
}

export function getCartLocalStorage() {
  // let localCartItems = localStorage.getItem('localCart');
  // setCartItems(JSON.parse(localCartItems));
  updateCart();
}

export function fillCartList() {
  if (cartItems) {
    cartItems.forEach((cartListItem) => {
      cartItemsList.insertAdjacentHTML(
        'afterbegin',
        cartItemTemplate(cartListItem)
      );
    });
  }
}

export function addToCart(event) {
  getCart();

  let eventTarget = event.target;
  let productId = eventTarget.getAttribute('productid');
  let productOptionId = eventTarget.getAttribute('productoptionid');

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

  updateCart();
}

export function addCartItem(cartItem) {
  cartItemsList.insertAdjacentHTML('afterbegin', cartItemTemplate(cartItem));
}

export function clearCartItem(productId, optionId) {
  let targetCartItem = document.getElementById(
    `cart-item-${productId + optionId}`
  );
  cartItemsList.removeChild(targetCartItem);
}

export function clearCartList() {
  while (cartItemsList.firstChild) {
    cartItemsList.removeChild(cartItemsList.lastChild);
  }
}

export function updateCartItem(cartItem) {
  let cartItemElement = document.getElementById(
    `cart-item-${cartItem.productId + cartItem.option.optionId}`
  );

  cartItemElement.querySelector('.cart-item-count').innerText = cartItem.count;
  cartItemElement.querySelector('.cart-item-price').children[0].innerText =
    formatCurrency(cartItem.totalPrice);
}

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
                onclick="addToCart(event)"
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
                onclick="subtractFromCart(event)"
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
              onclick="removeFromCart(event)"
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
