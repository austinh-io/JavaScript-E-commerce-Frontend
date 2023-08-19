const cards = document.querySelectorAll('.product-card');

cards.forEach((card) => {
  let cardNum = 0;
  cardNum++;
  const cardCarousel = {
    name: cardNum,
    activeIndex: 0,
    buttons: card.querySelectorAll('[data-carousel-button]'),
    slides: card.querySelector('[data-slides]'),
  };

  initCardSlides(cardCarousel.slides);

  cardCarousel.buttons.forEach((button) => {
    button.addEventListener('click', function () {
      handleCarouselButton(cardCarousel, button);
    });

    // console.log(button);
  });

  // console.log(cardCarousel);
});

function handleCarouselButton(cardObj, currentButton) {
  const offset = currentButton.dataset.carouselButton === 'next' ? -1 : 1;
  cardObj.activeIndex += offset;
  // console.log(currentButton.dataset.carouselButton);
  // console.log('Active Index: ' + cardObj.activeIndex);
  // console.log('Offset: ' + offset);

  cardSlides = [...cardObj.slides.children];

  cardSlides.forEach((cardSlide) => {
    let cardTransformAmount = 0;

    if (-cardObj.activeIndex < 0)
      cardObj.activeIndex = -cardObj.slides.children.length + 1;

    if (-cardObj.activeIndex >= cardObj.slides.children.length)
      cardObj.activeIndex = 0;

    cardTransformAmount =
      (myCardSlides.indexOf(cardSlide) + cardObj.activeIndex) * 100 + '%';

    cardSlide.style.transform = `translateX(${cardTransformAmount})`;

    // console.log(cardSlides.indexOf(cardSlide) + ' ' + cardTransformAmount);

    console.log(cardObj.name);
  });
}

function initCardSlides(cardSlides) {
  myCardSlides = [...cardSlides.children];

  myCardSlides.forEach((cardSlide) => {
    let cardTransformAmount = myCardSlides.indexOf(cardSlide) * 100 + '%';
    cardSlide.style.transform = `translateX(${cardTransformAmount})`;
    // if (
    //   myCardSlides.indexOf(cardSlide) == myCardSlides.length - 1 &&
    //   myCardSlides.indexOf(cardSlide) != 0
    // )
    //   cardSlide.style.transform = `translateX(-100%)`;
    // else {
    //   let cardTransformAmount = myCardSlides.indexOf(cardSlide) * 100 + '%';
    //   cardSlide.style.transform = `translateX(${cardTransformAmount})`;
    // }
  });
}
