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

function cardOptionField(product, index) {
  return `
  <div>
    <input
      type="radio"
      id="option-${product.id}-${product.options[index].optionId}"
      name="options-item-${product.id}"
      value="option-${product.options[index].optionId}"
      onChange="handleProductOptionChange(event)"
      checked
    />
    <label
      for="option-${product.id}-${product.options[index].optionId}"
      class="hidden"
      >Option ${index}</label
    >
  </div>
  `;
}

const productCardTemplate = function (product) {
  let cardOptionsFieldset = undefined;

  if (product.options.length > 1) {
    let cardOptions = '';

    for (let i = 0; i < product.options.length; i++) {
      cardOptions += cardOptionField(product, i);
    }

    cardOptionsFieldset = `
    <fieldset class="product-fieldset">
      <legend class="hidden">Variant</legend>

      ${cardOptions}

    </fieldset>
    `;
  } else {
    cardOptionsFieldset = '';
  }

  return `
  <div class="product" data-id=${product.id}>
    <div class="product-image-container">
        <img
        class="product-image"
        src="${product.options[0].imageSource}"
        />
    </div>
    <div class="product-info-container">
        <div class="product-brand">${product.options[0].brand}</div>
        <div class="product-title">${product.options[0].title}</div>
        <div class="product-description">
          <p>
            ${product.options[0].description}
          </p>          
        </div>

        ${cardOptionsFieldset}        

        <div class="product-price">
          <span class="product-price-value">${formatCurrency(
            product.options[0].price
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
              src="${item.product.options[0].imageSource}"
              class="cart-item-image"
            />
          </div>
          <div class="cart-item-col2">
            <div class="cart-item-title">${item.product.options[0].title}</div>

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

              <div class="cart-item-count">${item.options[0].count}</div>

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

  updateUi(); //Note: this function can be redundant since it is also called in removeFromCart() sometimes.
  //If updateUi() begins to affect performance, then I should find a way to only call this only once as opposed to twice
  //Or only update the UI elements that are necessary
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

function handleProductOptionChange(event) {
  console.log(event);
}

function updateCatalogItemsCartButtons() {
  //TODO:
  //Find way to activate/deactivate buttons based on if item is in cart/not in cart.
  //This check should happen every time an item is added, removed, or an option of an item is selected
}

function updateUi() {
  updateCartList();
  updateCartItemsCount();
  updateCartSubtotal();
  updateCatalogItemsCartButtons();
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

  console.log(products.length);

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
