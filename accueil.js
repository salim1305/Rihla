document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const prevButton = document.querySelector('.carousel-btn.prev');
  const nextButton = document.querySelector('.carousel-btn.next');

  let currentIndex = 0;
  const slideWidth = 220; // 200px slide width + 2*10px margin

  // Nombre maximum d'éléments visibles selon la largeur du container
  function maxIndex() {
    return track.children.length - Math.floor(track.parentElement.offsetWidth / slideWidth);
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < maxIndex()) {
      currentIndex++;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  });

  // Optionnel: ajuste le carrousel au redimensionnement
  window.addEventListener('resize', () => {
    if (currentIndex > maxIndex()) {
      currentIndex = maxIndex();
      if (currentIndex < 0) currentIndex = 0;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  });
});