const myCard = document.querySelector('.product-card');

const buttons = myCard.querySelectorAll('[data-carousel-button]');
const slides = myCard.querySelector('[data-slides]');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const offset = button.dataset.carouselButton === 'prev' ? -1 : 1;
    console.log(offset);
  });
});

slides.children[2].style.transform = 'translateX(-100%)';
slides.children[1].style.transform = 'translateX(100%)';
