
let cards = [];

fetch('cards.json')
  .then(response => response.json())
  .then(data => {
    cards = data;
    displayCards(cards);
  });

function displayCards(data) {
  const container = document.getElementById('card-container');
  container.innerHTML = '';
  data.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    cardDiv.innerHTML = `
      <h2>${card.jmeno}</h2>
      <p><strong>ID:</strong> ${card.id}</p>
      <p><strong>Série:</strong> ${card.serie}</p>
      <p><strong>Číslo:</strong> ${card.cislo}</p>
      ${card.limitace ? `<p><strong>Limitace:</strong> ${card.limitace}</p>` : ''}
      ${card.podpis ? `<p><strong>Podpis:</strong> ${card.podpis}</p>` : ''}
      ${card.memorabilia ? `<p><strong>Memorabilia:</strong> ${card.memorabilia}</p>` : ''}
      ${card.rookie ? `<p><strong>Rookie:</strong> ${card.rookie}</p>` : ''}
    `;
    container.appendChild(cardDiv);
  });
}

document.querySelectorAll('#filters input').forEach(input => {
  input.addEventListener('input', () => {
    const id = document.getElementById('filter-id').value.toLowerCase();
    const jmeno = document.getElementById('filter-jmeno').value.toLowerCase();
    const serie = document.getElementById('filter-serie').value.toLowerCase();
    const cislo = document.getElementById('filter-cislo').value.toLowerCase();

    const filtered = cards.filter(card =>
      (!id || (card.id + '').toLowerCase().includes(id)) &&
      (!jmeno || card.jmeno.toLowerCase().includes(jmeno)) &&
      (!serie || card.serie.toLowerCase().includes(serie)) &&
      (!cislo || (card.cislo + '').toLowerCase().includes(cislo))
    );
    displayCards(filtered);
  });
});
