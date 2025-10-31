const API_KEY = "828f9ddd8b6b4b80b36a1fb59389e09c";

const flavorQuotes = [
  "Flavor is a journey, not a destination.",
  "Every spice tells a story—let your dish speak.",
  "Cooking is chemistry with soul.",
  "The best recipes are born from curiosity.",
  "Taste buds are the gateway to imagination.",
  "Simplicity is the ultimate flavor sophistication.",
  "Let your ingredients dance, not compete.",
  "A pinch of love makes every dish divine."
];

// Show a random flavor quote
function showFlavorQuote() {
  const quoteEl = document.getElementById("flavorQuote");
  if (quoteEl) {
    const randomIndex = Math.floor(Math.random() * flavorQuotes.length);
    quoteEl.textContent = flavorQuotes[randomIndex];
  }
}

// Toggle loader visibility
function showLoader(show) {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.toggle("hidden", !show);
  }
}

// Fetch recipes from Spoonacular API
async function findRecipes() {
  const input = document.getElementById("ingredientInput").value.trim();
  if (!input) {
    alert("Please enter at least one ingredient.");
    return;
  }

  showLoader(true);

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${input}&number=6&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    displayRecipes(data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    alert("Something went wrong while fetching recipes.");
  } finally {
    showLoader(false);
  }
}

// Display fetched recipes
function displayRecipes(recipes) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
      <button onclick='saveToFavorites(${JSON.stringify(recipe)})'>❤️ Favorite</button>
    `;

    resultsContainer.appendChild(card);
  });
}

// Save recipe to MongoDB via backend
function saveToFavorites(recipe) {
  const favoriteData = {
    title: recipe.title,
    image: recipe.image,
    sourceUrl: `https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-')}-${recipe.id}`
  };

  fetch('http://localhost:5000/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(favoriteData)
  })
    .then(res => {
      if (!res.ok) throw new Error('Failed to save favorite');
      return res.json();
    })
    .then(() => {
      alert(`${recipe.title} added to favorites!`);
    })
    .catch(err => {
      console.error('Error saving favorite:', err);
      alert('Could not save favorite. Please try again.');
    });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  showFlavorQuote();
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", findRecipes);
  }
});
