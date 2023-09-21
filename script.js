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
          ${product.description}
        </div>
        <div class="product-price">
          <span class="product-currency">$</span>
          <span class="product-price-value">${product.price}</span>
        </div>

        <div class="product-button-group" data-id=${product.id}>
          <button class="button-product button-add">Add to Cart</button>
          <button class="button-product button-remove">
          Remove from Cart
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
    <div class="cart-item-image-container">
      <img
        src="${item.product.imageSource}"
        alt=""
        class="cart-item-image"
      />
    </div>
    <div class="cart-item-info">
      <div class="cart-item-title">${item.product.title}</div>
      <div class="cart-item-count">${item.count}</div>
      <div class="cart-item-price">
        <span>$</span><span>${item.totalPrice}</span>
      </div>
      <div class="cart-item-buttons-container" data-id=${item.product.id}>
        <button class="button-product button-add" onclick="handleAddToCart(event)">
          Add More
        </button>
        <button class="button-product button-remove">
          Remove
        </button>
      </div>
    </div>
  </div>
  `;
};

const productsList = document.querySelector('.products-list');
const cartItemsList = document.querySelector('.cart-items-container');

function cartItem(count, product, totalPrice) {
  this.count = count;
  this.product = product;
  this.totalPrice = totalPrice;
}

let cartItems = [];
let addToCartButtons = [];
let products = new Array();

function handleAddToCart(event) {
  clearCartList();
  const productId = event.target.parentElement.dataset.id;

  let productToPush = products.find((product) => product.id == productId);

  if (cartItems.find((item) => item.product.id === productToPush.id)) {
    const foundItem = cartItems.find((item) => item.product === productToPush);
    foundItem.count += 1;
    foundItem.totalPrice = foundItem.count * foundItem.product.price;
  } else {
    const newItem = new cartItem(1, productToPush, productToPush.price);
    cartItems.push(newItem);
  }
  fillCartList();
}

function handleRemoveFromCart() {
  console.log('remove');
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
  const response = await fetch('../data/products.json');
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

  addToCartButtons = document.getElementsByClassName(
    'button-product button-add'
  );

  removeFromCartButtons = document.getElementsByClassName(
    'button-product button-remove'
  );

  for (let i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener('click', handleAddToCart);
  }

  for (let i = 0; i < removeFromCartButtons.length; i++) {
    removeFromCartButtons[i].addEventListener('click', handleRemoveFromCart);
  }
}

initializePage();
