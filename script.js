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
        <span class="product-currency">$</span
        ><span class="product-price-value">${product.price}</span>
        </div>

        <div class="product-button-group">
          <button class="button-product button-add">Add to Cart</button>
          <button class="button-product button-remove">
          Remove from Cart
        </button>
    </div>
    </div>
  </div>
`;
};

const cardsGroup = document.querySelector('.products-list');

function cartItem(count, product, totalPrice) {
  this.count = count;
  this.product = product;
  this.totalPrice = totalPrice;
}

let cartItems = [];
let addToCartButtons = [];
let products = new Array();

function handleAddToCart() {
  const productId = this.parentElement.parentElement.parentElement.dataset.id;

  console.log(productId);

  let productToPush = products.find((product) => product.id == productId);

  console.log(productToPush);

  if (cartItems.find((item) => item.product.id === productToPush.id)) {
    const foundItem = cartItems.find((item) => item.product === productToPush);
    foundItem.count += 1;
    foundItem.totalPrice = foundItem.count * foundItem.product.price;
  } else {
    const newItem = new cartItem(1, productToPush, productToPush.price);
    cartItems.push(newItem);
  }

  console.table(cartItems);
}

function handleRemoveFromCart() {
  console.log('remove');
}

async function catchProductList() {
  const response = await fetch('../data/products.json');
  const productsObj = await response.json();
  products = [...productsObj];
}

async function populateCatalog() {
  await catchProductList();

  for (let i = 0; i < products.length; i++) {
    cardsGroup.insertAdjacentHTML(
      'afterbegin',
      productCardTemplate(products[i])
    );
  }
}

async function init() {
  await populateCatalog();

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

init();
