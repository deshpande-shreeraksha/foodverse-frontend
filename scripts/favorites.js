document.addEventListener("DOMContentLoaded", () => {
  const favoritesList = document.getElementById("favoritesList");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    favoritesList.innerHTML = "<p>No favorites yet. Go find something tasty!</p>";
    return;
  }

  favorites.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <button onclick="removeFavorite(${recipe.id})">❌ Remove</button>
    `;

    favoritesList.appendChild(card);
  });
});

function removeFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(recipe => recipe.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  location.reload();
}
