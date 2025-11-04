const buttons = document.querySelectorAll('.filter-btn');
const offers = document.querySelectorAll('.offer');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.category;

    offers.forEach(offer => {
      if (category === 'Wszystko' || offer.dataset.category === category) {
        offer.style.display = 'block';
      } else {
        offer.style.display = 'none';
      }
    });
  });
});
