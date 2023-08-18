const cards = document.querySelectorAll('.product-card');

cards.forEach((card) => {
  const buttons = card.querySelectorAll('[data-carousel-button]');
  const slides = card.querySelector('[data-slides]');
  initCardSlides(slides);

  const cardCarousel = {
    carouselIndex: 0,
  };

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      handleCarouselButton(cardCarousel, button);
    });
  });
});

function handleCarouselButton(currentIndex, currentButton) {
  const offset = currentButton.dataset.carouselButton === 'prev' ? -1 : 1;
  currentIndex.carouselIndex += offset;
  console.log(currentIndex.carouselIndex);
}

function initCardSlides(cardSlides) {
  myCardSlides = [...cardSlides.children];

  myCardSlides.forEach((cardSlide) => {
    if (myCardSlides.indexOf(cardSlide) == myCardSlides.length - 1)
      cardSlide.style.transform = `translateX(-100%)`;
    else {
      let cardTransformAmount = myCardSlides.indexOf(cardSlide) * 100 + '%';
      cardSlide.style.transform = `translateX(${cardTransformAmount})`;
    }
  });
}
