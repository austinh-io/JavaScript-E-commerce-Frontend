const cards = document.querySelectorAll('.product-card');

cards.forEach((card) => {
  const cardCarousel = {
    activeIndex: 0,
    buttons: card.querySelectorAll('[data-carousel-button]'),
    slides: card.querySelector('[data-slides]'),
  };

  initCardSlides(cardCarousel.slides);

  cardCarousel.buttons.forEach((button) => {
    button.addEventListener('click', function () {
      handleCarouselButton(cardCarousel, button);
    });
  });
});

function handleCarouselButton(cardObj, currentButton) {
  const offset = currentButton.dataset.carouselButton === 'next' ? -1 : 1;
  cardObj.activeIndex += offset;

  const cardSlides = [...cardObj.slides.children];

  cardSlides.forEach((cardSlide) => {
    if (-cardObj.activeIndex < 0)
      cardObj.activeIndex = -cardObj.slides.children.length + 1;

    if (-cardObj.activeIndex >= cardObj.slides.children.length)
      cardObj.activeIndex = 0;

    let cardTransformAmount =
      (cardSlides.indexOf(cardSlide) + cardObj.activeIndex) * 100 + '%';

    cardSlide.style.transform = `translateX(${cardTransformAmount})`;
  });
}

function initCardSlides(cardSlides) {
  const myCardSlides = [...cardSlides.children];

  myCardSlides.forEach((cardSlide) => {
    let cardTransformAmount = myCardSlides.indexOf(cardSlide) * 100 + '%';
    cardSlide.style.transform = `translateX(${cardTransformAmount})`;
  });
}
