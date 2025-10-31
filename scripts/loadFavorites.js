function confirmDelete(id, title) {
  const confirmed = confirm(`Are you sure you want to remove "${title}" from favorites?`);
  if (confirmed) {
    deleteFavorite(id);
  }
}

function deleteFavorite(id) {
  fetch(`http://localhost:5000/api/favorites/${id}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete');
      location.reload();
    })
    .catch(err => {
      console.error('Error deleting favorite:', err);
      alert('Could not delete favorite. Please try again.');
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favorites-container");

  fetch('http://localhost:5000/api/favorites')
    .then(res => res.json())
    .then(favorites => {
      if (!favorites.length) {
        container.innerHTML = "<p>No favorites saved yet.</p>";
        return;
      }

      favorites.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";
        card.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}" />
          <h3>${recipe.title}</h3>
          <p><a href="${recipe.sourceUrl}" target="_blank">View Recipe</a></p>
          <button onclick="confirmDelete('${recipe._id}', '${recipe.title}')">🗑️ Remove</button>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Error loading favorites:', err);
      container.innerHTML = "<p>Error loading favorites.</p>";
    });
});
