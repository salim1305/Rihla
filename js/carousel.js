// Carousel catégories page d'accueil Rihla

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');

  if (!track || slides.length === 0 || !nextBtn || !prevBtn) return;

  let currentIndex = 0;
  const maxIndex = slides.length - 1;

  function updateCarousel() {
    slides.forEach((slide, i) => {
      slide.style.display = i === currentIndex ? 'block' : 'none';
    });
  }

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1) < 0 ? maxIndex : currentIndex - 1;
    updateCarousel();
  });

  updateCarousel();
});
