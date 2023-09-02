const productCardTemplate = function (
  name,
  brand,
  desc,
  price,
  promo,
  imageId
) {
  return `
<div class="product-card">
  <div class="product-card-img-container">
    <div class="product-card-img-top-container">
      <div class="product-card-image-label-new">
        <span
          class="material-symbols-rounded product-card-image-label-new-icon"
        >
          new_releases
        </span>
        <span>New</span>
      </div>

      <button
        class="product-card-wishlist-add-btn product-card-button"
      >
        <span
          class="material-symbols-rounded product-card-wishlist-add-icon product-card-wishlist-add-icon-inactive"
        >
          favorite
        </span>
      </button>
    </div>

    <div class="product-card-img-bottom-container">
      <div class="product-card-ratings">
        <span
          class="material-symbols-rounded rating-star rating-star-active"
        >
          star
        </span>
        <span
          class="material-symbols-rounded rating-star rating-star-active"
        >
          star
        </span>
        <span
          class="material-symbols-rounded rating-star rating-star-active"
        >
          star
        </span>
        <span
          class="material-symbols-rounded rating-star rating-star-inactive"
        >
          star
        </span>
        <span
          class="material-symbols-rounded rating-star rating-star-inactive"
        >
          star
        </span>
      </div>
    </div>

    <div class="product-card-img-nav-buttons">
      <div class="img-button-container">
        <button
          class="product-card-img-nav-button product-card-img-nav-button-previous"
          data-carousel-button="prev"
        >
          <span
            class="material-symbols-rounded product-card-img-nav-button-icon"
          >
            chevron_left
          </span>
        </button>
      </div>
      <div class="img-button-container">
        <button
          class="product-card-img-nav-button product-card-img-nav-button-next"
          data-carousel-button="next"
        >
          <span
            class="material-symbols-rounded product-card-img-nav-button-icon"
          >
            chevron_right
          </span>
        </button>
      </div>
    </div>

    <div
      class="product-card-images"
      data-carousel
    >
      <div data-slides>
        <div
          class="product-card-img img1"
          data-active
        >
          <img src="https://picsum.photos/id/${imageId}/800/" />
        </div>

        <div class="product-card-img img2">
          <img src="https://picsum.photos/id/${imageId}/800/" />
        </div>

        <div class="product-card-img img3">
          <img src="https://picsum.photos/id/${imageId}/800/" />
        </div>
      </div>
    </div>
  </div>
  <div class="product-card-container">
    <div class="product-card-ratings-wishlist-group"></div>
    <div class="product-card-title-group-container">
      <div class="product-card-title-brand-group">
        <div class="product-card-brand"><a>${brand}</a></div>
        <div class="product-card-title"><a>${name}</a></div>
      </div>
    </div>

    <div class="product-card-description">
      ${desc}
    </div>
  </div>

  <div class="product-card-promotion">
    <span
      class="material-symbols-rounded product-card-promotion-icon"
    >
      money_off
    </span>
    <span>${promo}</span>
  </div>

  <div class="product-card-container">
    <div class="product-card-subinfo">
      <div class="product-color">
        <fieldset class="product-color-fieldset">
          <legend class="product-color-fieldset-title">Color</legend>
          <div>
            <input
              class="product-color-radio-btn radio-btn-color-black"
              type="radio"
              id="product0-black"
              name="color"
              value="black"
              checked
            />
            <label
              class="product-color-label product-color-label-black"
              for="product0-black"
              ><span class="product-color-label-text"
                >Black</span
              ></label
            >
          </div>
          <div>
            <input
              class="product-color-radio-btn radio-btn-color-white"
              type="radio"
              id="product0-white"
              name="color"
              value="white"
            />
            <label
              class="product-color-label product-color-label-white"
              for="product0-white"
              ><span class="product-color-label-text"
                >White</span
              ></label
            >
          </div>
          <div>
            <input
              class="product-color-radio-btn radio-btn-color-red"
              type="radio"
              id="product0-red"
              name="color"
              value="red"
            />
            <label
              class="product-color-label product-color-label-red"
              for="product0-red"
              ><span class="product-color-label-text"
                >Red</span
              ></label
            >
          </div>
          <div>
            <input
              class="product-color-radio-btn radio-btn-color-blue"
              type="radio"
              id="product0-blue"
              name="color"
              value="blue"
            />
            <label
              class="product-color-label product-color-label-blue"
              for="product0-blue"
              ><span class="product-color-label-text"
                >Blue</span
              ></label
            >
          </div>
          <div>
            <input
              class="product-color-radio-btn radio-btn-color-green"
              type="radio"
              id="product0-green"
              name="color"
              value="green"
            />
            <label
              class="product-color-label product-color-label-green"
              for="product0-green"
              ><span class="product-color-label-text"
                >Green</span
              ></label
            >
          </div>
        </fieldset>
      </div>

      <div class="product-card-price">
        <span class="product-card-price-currency">$</span
        ><span class="product-card-price-value">${price}</span>
      </div>
    </div>
    <div class="product-card-price-cart-group">
      <button
        class="hidden product-card-button product-card-cart-add-btn"
      >
        Add to Cart
      </button>
      <div class="product-card-quantity">
        <button
          class="product-quantity-btn product-quantity-btn-subtract"
        >
          <span
            class="material-symbols-outlined product-quantity-btn-icon"
          >
            remove
          </span>
        </button>
        <input
          type="number"
          class="product-quantity"
          id="product-quantity"
          name="product-quantity"
          min="0"
          max="10"
          placeholder="0"
        />
        <button class="product-quantity-btn product-quantity-btn-add">
          <span
            class="material-symbols-rounded product-quantity-btn-icon"
          >
            add
          </span>
        </button>
      </div>

      <button
        class="product-card-cart-remove-btn product-card-button"
      >
        <span
          class="material-symbols-rounded product-card-cart-remove-btn-icon"
        >
          delete
        </span>
        <span>Remove</span>
      </button>
    </div>
  </div>
</div>
`;
};

const cardsGroup = document.querySelector('.products-list');

// console.log(cardsGroup);

let products = new Array();

async function catchProductList() {
  const response = await fetch('../data/products.json');
  const productsObj = await response.json();

  // console.log(productsObj);

  // Object.assign(products, productsObj);
  products = [...productsObj];
}

async function populateCatalog() {
  await catchProductList();

  console.log('Length: ' + products.length);
  console.table(products);

  for (let i = 0; i < products.length; i++) {
    cardsGroup.insertAdjacentHTML(
      'afterbegin',
      productCardTemplate(
        'name ' + i,
        'brand ' + i,
        'desc ' + i,
        1.99 * i,
        'promo ' + i,
        i * 10
      )
    );
  }
}

populateCatalog();
