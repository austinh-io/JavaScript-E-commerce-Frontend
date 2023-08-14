const slides = document.querySelectorAll('.product-card-img');

slides.forEach((slide, i) => {
  slide.computedStyleMap.transform = `translateX(${i * 100}%)`;
});
