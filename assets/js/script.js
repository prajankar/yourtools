const searchInput = document.getElementById('toolSearch');

if (searchInput) {
  searchInput.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.tool-card-item');

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const matches = text.includes(query);
      card.style.display = matches ? '' : 'none';
    });
  });
}
