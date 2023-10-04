'use strict';

const productsList = document.querySelector('.products-list');
const cartItemsList = document.querySelector('.cart-items-container');
const cartIconCounter = document.querySelector('.cart-icon-counter');
const totalCostValueElement = document.querySelector('.total-cost-value');

let cartItems = new Array();
let addToCartButtons = new Array();
let products = new Array();

const catalogItemButtonText_Enabled = 'Add to Cart';
const catalogItemButtonText_Disabled = 'Item in Cart';

function cartItem(count, product, totalPrice) {
  this.count = count;
  this.product = product;
  this.totalPrice = totalPrice;
}

const productCardTemplate = function (product) {
  return `
  <div class="product" data-id=${product.id}>
    <div class="product-image-container">
        <img
        class="product-image"
        src="${product.imageSource}"
        />
    </div>
    <div class="product-info-container">
        <div class="product-brand">${product.brand}</div>
        <div class="product-title">${product.title}</div>
        <div class="product-description">
          <p>
            ${product.description}
          </p>
          
        </div>
        <div class="product-price">
          <span class="product-price-value">${formatCurrency(
            product.price
          )}</span>
        </div>

        <div class="product-button-group" data-id=${product.id}>
          <button
            class="button-product button-add"
            id="button-product-${product.id}"
            onclick="addToCart(event)"
          >
            ${catalogItemButtonText_Enabled}
          </button>
      </div>
    </div>
  </div>
`;
};

const cartItemTemplate = function (item) {
  return `
        <div
          class="cart-item-container"
          data-id="${item.product.id}"
        >
          <div class="cart-item-col1">
            <img
              src="${item.product.imageSource}"
              class="cart-item-image"
            />
          </div>
          <div class="cart-item-col2">
            <div class="cart-item-title">${item.product.title}</div>

            <div
              class="cart-item-buttons-container"
            >
              <button
                class="button-cart button-add"
                onclick="addToCart(event)"
                data-id="${item.product.id}"
              >
                <span class="material-symbols-outlined button-cart-icon">
                  stat_1
                </span>
              </button>

              <div class="cart-item-count">${item.count}</div>

              <button
                class="button-cart button-subtract"
                onclick="subtractFromCart(event)"
                data-id="${item.product.id}"
              >
                <span class="material-symbols-outlined button-cart-icon">
                  stat_minus_1
                </span>
              </button>
            </div>
          </div>
          <div class="cart-item-col3">
            <button
              class="button-cart button-remove"
              data-id="${item.product.id}"
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

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function addToCart(event) {
  const productId = event.target.parentElement.dataset.id;
  let productToAdd = products.find((product) => product.id == productId);

  if (cartItems.find((item) => item.product.id === productToAdd.id)) {
    const foundItem = cartItems.find((item) => item.product === productToAdd);
    foundItem.count += 1;
    foundItem.totalPrice = foundItem.count * foundItem.product.price;
  } else {
    const newItem = new cartItem(1, productToAdd, productToAdd.price);
    cartItems.push(newItem);
  }

  updateUi();

  if (event.srcElement.classList.contains('button-product')) {
    event.srcElement.disabled = true;
    event.srcElement.innerText = catalogItemButtonText_Disabled;
  }
}

function subtractFromCart(event) {
  const productId = event.target.parentElement.dataset.id;
  let productToRemove = products.find((product) => product.id == productId);

  const foundItem = cartItems.find((item) => item.product === productToRemove);

  if (foundItem) {
    if (
      cartItems.find((item) => item.product.id === productToRemove.id).count > 1
    ) {
      foundItem.count -= 1;
      foundItem.totalPrice = foundItem.count * foundItem.product.price;
    } else {
      removeFromCart(foundItem);
    }
  }

  updateUi();
}

function removeFromCart(event) {
  let catalogItemButton = undefined;

  if (event.target) {
    const targetProductId = event.target.parentElement.dataset.id;

    let targetProduct = products.find(
      (product) => product.id == targetProductId
    );

    let targetCartItem = cartItems.find(
      (item) => item.product === targetProduct
    );

    cartItems.splice(cartItems.indexOf(targetCartItem), 1);

    catalogItemButton = document.getElementById(
      `button-product-${targetProductId}`
    );
  } else if (event.product) {
    cartItems.splice(cartItems.indexOf(event), 1);

    catalogItemButton = document.getElementById(
      `button-product-${event.product.id}`
    );
  }

  catalogItemButton.innerText = catalogItemButtonText_Enabled;
  catalogItemButton.disabled = false;

  updateUi();
}

function updateUi() {
  updateCartList();
  updateCartItemsCount();
  updateCartSubtotal();
}

function updateCartItemsCount() {
  let totalItems = cartItems.reduce((sum, cur) => sum + cur.count, 0);
  cartIconCounter.innerText = totalItems;

  if (cartItems.length > 0) {
    cartIconCounter.classList.remove('hidden');
  } else {
    cartIconCounter.classList.add('hidden');
  }
}

function updateCartSubtotal() {
  let totalCost = cartItems.reduce((sum, cur) => sum + cur.totalPrice, 0);
  totalCostValueElement.innerText = formatCurrency(totalCost);
}

function updateCartList() {
  clearCartList();
  fillCartList();
}

function clearCartList() {
  while (cartItemsList.firstChild) {
    cartItemsList.removeChild(cartItemsList.lastChild);
  }
}

function fillCartList() {
  cartItems.forEach((cartListItem) => {
    cartItemsList.insertAdjacentHTML(
      'afterbegin',
      cartItemTemplate(
        cartItems.find((item) => item.product.id === cartListItem.product.id)
      )
    );
  });
}

async function catchProductList() {
  const response = await fetch('./data/products.json');
  const productsObj = await response.json();
  products = [...productsObj];
}

async function initializeProducts() {
  await catchProductList();

  for (let i = 0; i < products.length; i++) {
    productsList.insertAdjacentHTML(
      'beforeend',
      productCardTemplate(products[i])
    );
  }
}

async function initializePage() {
  await initializeProducts();
}

initializePage();
