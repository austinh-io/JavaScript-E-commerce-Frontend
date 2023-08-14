const productCardTemplate = `
<div class="product-card">
            <div class="product-card-img-container">
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
                      for="black"
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
                      for="white"
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
                      for="red"
                      ><span class="product-color-label-text">Red</span></label
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
                      for="blue"
                      ><span class="product-color-label-text">Blue</span></label
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
                      for="green"
                      ><span class="product-color-label-text"
                        >Green</span
                      ></label
                    >
                  </div>
                </fieldset>
              </div>
              <button class="product-card-wishlist-add-btn product-card-button">
                <span
                  class="material-symbols-rounded product-card-wishlist-add-icon product-card-wishlist-add-icon-inactive"
                >
                  favorite
                </span>
              </button>
              <div class="hidden product-card-image-label-new">
                <span
                  class="material-symbols-rounded product-card-image-label-new-icon"
                >
                  new_releases
                </span>
                <span>New</span>
              </div>
              <div class="product-card-img-nav-buttons">
                <button
                  class="product-card-img-nav-button product-card-img-nav-button-previous"
                >
                  <span class="material-symbols-rounded"> chevron_left </span>
                </button>
                <button
                  class="product-card-img-nav-button product-card-img--nav-button-next"
                >
                  <span class="material-symbols-rounded"> chevron_right </span>
                </button>
              </div>

              <img
                class="product-card-img"
                src="https://picsum.photos/800/"
              />
            </div>
            <div class="product-card-container">
              <div class="product-card-ratings-wishlist-group">
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
              <div class="product-card-title-brand-group">
                <div class="product-card-title"><a>Product Name</a></div>
                <div class="product-card-brand"><a>Brand Name</a></div>
              </div>

              <div class="product-card-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                tincidunt nisi faucibus arcu lacinia tincidunt. Quisque lacinia
                hendrerit massa. Class aptent taciti sociosqu ad litora torquent
                per conubia nostra, per inceptos himenaeos. Sed nec nisl lectus.
                Maecenas lacus metus, finibus in purus eu, egestas placerat
                nunc. Etiam finibus sem id orci imperdiet finibus. Sed odio
                enim, interdum ac massa at, fermentum rutrum turpis. Nullam
                faucibus odio at nisl sodales porta. Pellentesque metus nibh,
                euismod a magna quis, dapibus iaculis nunc. Mauris porta tellus
                ut mi pulvinar, in feugiat neque hendrerit. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
              </div>

              <div class="hidden product-card-promotion">Promotion</div>

              <div class="product-card-price-cart-group">
                <div class="product-card-price">
                  <span class="product-card-price-currency">$</span
                  ><span class="product-card-price-value">9.99</span>
                </div>
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
                  <span class="material-symbols-rounded"> delete </span>
                </button>
              </div>
            </div>
          </div>
        </div>
`;

const cardsGroup = document.querySelector('.products-list');

console.log(cardsGroup);

function displayCards() {
  for (let i = 0; i < 10; i++) {
    console.log(i);
    cardsGroup.insertAdjacentHTML('afterbegin', productCardTemplate);
  }
}

displayCards();
