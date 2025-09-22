// Shared carousel script for multiple carousels
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach((carouselEl) => {
    const track = carouselEl.querySelector('.carousel-track');
    if (!track) return;

    const items = Array.from(track.children);
    const prevBtn = carouselEl.querySelector('[data-carousel-prev]');
    const nextBtn = carouselEl.querySelector('[data-carousel-next]');
    const bullets = Array.from(carouselEl.querySelectorAll('[data-carousel-bullet]'));

    let currentPage = 0;
    let autoplayInterval = null;

    function getVisibleCount() {
      if (!items[0]) return 1;
      const containerWidth = carouselEl.offsetWidth;
      const itemWidth = items[0].getBoundingClientRect().width;
      return Math.max(1, Math.round(containerWidth / itemWidth));
    }

    function getPageCount() {
      const visibleCount = getVisibleCount();
      return Math.max(1, items.length - visibleCount + 1);
    }

    function getItemWidth() {
      return items[0]?.getBoundingClientRect().width || carouselEl.offsetWidth;
    }

    function update() {
      const itemWidth = getItemWidth();
      track.style.transform = `translateX(-${currentPage * itemWidth}px)`;

      // update bullets if exist
      bullets.forEach((b, idx) => {
        b.style.backgroundColor =
          idx === currentPage
            ? b.dataset.activeColor || '#6A7CD8'
            : b.dataset.inactiveColor || '#C1C5D0';
      });
    }

    function next() {
      const pageCount = getPageCount();
      currentPage = (currentPage + 1) % pageCount;
      update();
    }

    function prev() {
      const pageCount = getPageCount();
      currentPage = (currentPage - 1 + pageCount) % pageCount;
      update();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoplay(); });

    bullets.forEach((b, idx) => {
      b.addEventListener('click', () => {
        currentPage = idx;
        update();
        resetAutoplay();
      });
    });

    // Autoplay support (data-autoplay in ms)
    const autoplayDelay = parseInt(carouselEl.dataset.autoplay, 10) || 0;
    function startAutoplay() {
      if (autoplayDelay > 0) {
        autoplayInterval = setInterval(next, autoplayDelay);
      }
    }
    function resetAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        startAutoplay();
      }
    }

    // handle resize to recompute translation
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(update, 120);
    });

    // initial update
    update();
    startAutoplay();
  });
});
