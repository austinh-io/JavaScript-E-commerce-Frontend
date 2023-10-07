'use strict';

const productsList = document.querySelector('.products-list');
const cartItemsList = document.querySelector('.cart-items-container');
const cartIconCounters = document.getElementsByClassName('cart-icon-counter');
const totalCostValueElement = document.querySelector('.total-cost-value');
const catalogProductsButtons = document.getElementsByClassName(
  'button-product button-add'
);

let cartItems = new Array();
let addToCartButtons = new Array();
let products = new Array();

const catalogItemButtonText_Enabled = 'Add to Cart';
const catalogItemButtonText_Disabled = 'Item in Cart';

function cartItem(id, productId, option, count, totalPrice) {
  this.id = id;
  this.productId = productId;
  this.option = option;
  this.count = count;
  this.totalPrice = totalPrice;
}

function cardOptionField(product, index) {
  let colors = ['#f9dbbd', '#fca17d', '#da627d', '#9a348e'];
  return `
  <div>
    <input
      type="radio"
      id="option-${product.id}-${product.options[index].optionId}"
      name="options-item-${product.id}"
      value="option-${product.options[index].optionId}"
      data-id="${product.id}"
      data-optionid="${product.options[index].optionId}"
      onChange="handleProductOptionChange(event)"
      ${index == 0 ? 'checked' : ''}
      style="
        background-color: ${colors[index]};
      "
    />
    <label
      for="option-${product.id}-${product.options[index].optionId}"
      class="hidden"
      >${product.options[index].optionLabel}</label
    >
  </div>
  `;
}

const productCardTemplate = function (product) {
  let cardOptionsFieldset = undefined;

  if (product.options.length <= 1) {
    cardOptionsFieldset = '';
  } else {
    let cardProductOptions = '';

    for (let i = 0; i < product.options.length; i++) {
      cardProductOptions += cardOptionField(product, i);
    }

    cardOptionsFieldset = `
    <fieldset class="product-fieldset">
      <legend class="hidden">Variant</legend>

      ${cardProductOptions}

    </fieldset>
    `;
  }

  return `
  <div class="product" id="product-${product.id}" data-id=${product.id}>
    <div class="product-image-container">
        <img
        class="product-image"
        src="/assets/images/productImages/small/${
          product.options[0].imageName
        }_small.webp/"
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

        <div class="product-button-group" data-id=${product.id} data-optionid=${
    product.options[0].optionId
  }>
          <button
            class="button-product button-add"
            id="button-product-${product.id + product.options[0].optionId}"
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
          data-id="${item.productId}"
          data-optionid="${item.option.optionId}"
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
            <div class="cart-item-title">${item.option.title}</div>
            <div class="cart-item-option-label">${item.option.optionLabel}</div>

            <div
              class="cart-item-buttons-container"
            >
              <button
                class="button-cart button-add"
                onclick="addToCart(event)"
                data-id="${item.productId}"
                data-optionid="${item.option.optionId}"
              >
                <span class="material-symbols-outlined button-cart-icon">
                  stat_1
                </span>
              </button>

              <div class="cart-item-count">${item.count}</div>

              <button
                class="button-cart button-subtract"
                onclick="subtractFromCart(event)"
                data-id="${item.productId}"
                data-optionid="${item.option.optionId}"
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
              data-id="${item.productId}"
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

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function findItem(_itemList, _productId, _optionId) {
  return _itemList.find((item) => {
    if (item.productId == _productId && item.option.optionId == _optionId)
      return item;
  });
}

function addToCart(event) {
  let eventTarget = event.target.parentElement;

  let productId = eventTarget.dataset.id;

  let productOptionId = eventTarget.dataset.optionid;

  let targetProduct = products.find((product) => product.id == productId);

  let productOptionToAdd = targetProduct.options.find(
    (productOption) => productOption.optionId == productOptionId
  );

  let cartItemToAdd = findItem(cartItems, productId, productOptionId);

  if (cartItemToAdd) {
    cartItemToAdd.count += 1;
    cartItemToAdd.totalPrice = cartItemToAdd.count * cartItemToAdd.option.price;
  } else {
    const newItem = new cartItem(
      productId + productOptionId,
      productId,
      productOptionToAdd,
      1,
      productOptionToAdd.price
    );
    cartItems.push(newItem);
  }

  updateUi();
}

function subtractFromCart(event) {
  const productId = event.target.parentElement.dataset.id;
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

  updateUi(); //Note: this function can be redundant since it is also called in removeFromCart() sometimes.
  //If updateUi() begins to affect performance, then I should find a way to only call this only once as opposed to twice
  //Or only update the UI elements that are necessary
}

function removeFromCart(event) {
  if (event.target) {
    const targetProductId = event.target.parentElement.dataset.id;
    const targetOptionId = event.target.parentElement.dataset.optionid;

    let targetItem = findItem(cartItems, targetProductId, targetOptionId);
    cartItems.splice(cartItems.indexOf(targetItem), 1);
  } else {
    cartItems.splice(cartItems.indexOf(event), 1);
  }

  updateUi();
}

function handleProductOptionChange(event) {
  let productId = event.target.dataset.id;
  let productOptionId = event.target.dataset.optionid;

  let targetProduct = products.find((product) => product.id == productId);

  let targetProductOption = targetProduct.options.find(
    (productOption) => productOption.optionId == productOptionId
  );

  const targetElement = document.getElementById(
    `product-${event.target.dataset.id}`
  );

  const image = targetElement.querySelector('.product-image');
  const brand = targetElement.querySelector('.product-brand');
  const title = targetElement.querySelector('.product-title');
  const description = targetElement.querySelector('.product-description')
    .children[0];
  const price = targetElement.querySelector('.product-price-value');
  const targetButtonGroup = targetElement.querySelector(
    '.product-button-group'
  );
  const targetButtonGroupChild = targetButtonGroup.children[0];

  image.src = `/assets/images/productImages/small/${targetProductOption.imageName}_small.webp/ `;
  brand.innerText = targetProductOption.brand;
  title.innerText = targetProductOption.title;
  description.innerText = targetProductOption.description;
  price.innerText = formatCurrency(targetProductOption.price);
  targetButtonGroup.dataset.optionid = productOptionId;
  targetButtonGroupChild.dataset.id = productId;
  targetButtonGroupChild.dataset.optionid = productOptionId;

  updateUi();
}

function updateCatalogItemsCartButtons() {
  for (let i = 0; i < catalogProductsButtons.length; i++) {
    if (
      findItem(
        cartItems,
        catalogProductsButtons[i].parentElement.dataset.id,
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

function updateUi() {
  updateCartList();
  updateCartItemsCount();
  updateCartSubtotal();
  updateCatalogItemsCartButtons();
}

function updateCartItemsCount() {
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
      cartItemTemplate(cartListItem)
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
