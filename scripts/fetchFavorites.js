document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:5000/api/favorites')
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById('favorites-container');
      if (data.length === 0) {
        container.innerHTML = '<p>No favorites saved yet.</p>';
        return;
      }

      data.forEach((recipe) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
          <h3>${recipe.title}</h3>
          <img src="${recipe.image}" alt="${recipe.title}" width="250" />
          <p><a href="${recipe.sourceUrl}" target="_blank">View Recipe</a></p>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => {
      console.error('Error fetching favorites:', err);
      document.getElementById('favorites-container').innerHTML = '<p>Error loading recipes.</p>';
    });
});
