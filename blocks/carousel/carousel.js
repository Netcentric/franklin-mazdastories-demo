export default async function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('carousel-slider-container');
  const slider = document.createElement('div');
  slider.classList.add('carousel-slider');
  container.append(slider);

  [...block.children].forEach((row) => {
    slider.append(...row.children);
    row.remove();
  });
  [...block.children].forEach((cell) => {
    if (cell.childNodes[0].textContent.trim() === '') {
      cell.childNodes[0].remove();
    }
  });
  block.append(container);

  const docRange = document.createRange();
  const docFrag = docRange.createContextualFragment(`
    <div class="carousel-controls">
      <button class="carousel-control carousel-control-prev" type="button">
        <img src="/icons/chevron-left-circle.svg" alt="Previous">
      </button>
      <div class="carousel-indicator">
        <div class="carousel-indicator-active"></div>
      </div>
      <button class="carousel-control carousel-control-next" type="button">
        <img src="/icons/chevron-right-circle.svg" alt="Next">
      </button>
    </div>
  `);
  block.append(docFrag);
  block.style.setProperty('--carousel-length', slider.childElementCount);
  block.style.setProperty('--carousel-index', 0);
  block.querySelector('.carousel-controls').addEventListener('click', (e) => {
    if (e.target.closest('.carousel-control-prev')) {
      const index = parseInt(block.style.getPropertyValue('--carousel-index'), 10);
      const newIndex = Math.max(0, index - 1);
      block.style.setProperty('--carousel-index', newIndex);
    }
    if (e.target.closest('.carousel-control-next')) {
      const index = parseInt(block.style.getPropertyValue('--carousel-index'), 10);
      const newIndex = Math.min(slider.childElementCount - 1, index + 1);
      block.style.setProperty('--carousel-index', newIndex);
    }
  });
}
