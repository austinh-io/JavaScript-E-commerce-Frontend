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
          <button class="button-product button-add" onclick="handleAddToCart(event)">Add to Cart</button>
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
                onclick="handleAddToCart(event)"
                data-id="${item.product.id}"
              >
                <span class="material-symbols-outlined button-cart-icon">
                  stat_1
                </span>
              </button>

              <div class="cart-item-count">${item.count}</div>

              <button
                class="button-cart button-subtract"
                onclick="handleSubtractFromCart(event)"
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
              onclick="removeItemFromCart(event)"
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

const productsList = document.querySelector('.products-list');
const cartItemsList = document.querySelector('.cart-items-container');
const cartIconCounter = document.querySelector('.cart-icon-counter');
const totalCostValueElement = document.querySelector('.total-cost-value');

function cartItem(count, product, totalPrice) {
  this.count = count;
  this.product = product;
  this.totalPrice = totalPrice;
}

let cartItems = [];
let addToCartButtons = [];
let products = new Array();

function formatCurrency(currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(currency);
}

function handleAddToCart(event) {
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
}

function handleSubtractFromCart(event) {
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
      removeItemFromCart(foundItem);
    }
  }

  updateUi();
}

function removeItemFromCart(item) {
  if (item.target) {
    const productId = item.target.parentElement.dataset.id;
    let itemToRemove = products.find((product) => product.id == productId);
    let foundItem = cartItems.find((myItem) => myItem.product === itemToRemove);
    cartItems.splice(cartItems.indexOf(foundItem), 1);
  } else {
    cartItems.splice(cartItems.indexOf(item), 1);
  }
  updateUi();
}

function updateUi() {
  updateCart();
  updateCartIconCounter();
  updateTotalCost();
}

function updateCartIconCounter() {
  let totalItems = cartItems.reduce((sum, cur) => sum + cur.count, 0);
  cartIconCounter.innerText = totalItems;

  if (cartItems.length > 0) {
    cartIconCounter.classList.remove('hidden');
  } else {
    cartIconCounter.classList.add('hidden');
  }
}

function updateTotalCost() {
  let totalCost = cartItems.reduce((sum, cur) => sum + cur.totalPrice, 0);
  totalCostValueElement.innerText = formatCurrency(totalCost);
}

function updateCart() {
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
      'afterbegin',
      productCardTemplate(products[i])
    );
  }
}

async function initializePage() {
  await initializeProducts();
}

initializePage();
