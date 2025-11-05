import React, { useState } from 'react';
import Footer from './Footer';
import '../style.css';

function Home() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [flavorQuote] = useState('Cook with what you have, love what you make.');

  // ... rest of your code stays the same
const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem('favorites');
  return saved ? JSON.parse(saved) : [];
});


 const handleSearch = async () => {
  if (!ingredients.trim()) return;

  setHasSearched(true);
  setLoading(true);
  try {
  const response = await fetch(
  `https://foodverse-backend-myrf.onrender.com/api/recipes?ingredients=${ingredients}`
);


    const data = await response.json();
    console.log('Fetched data:', data);

    // Spoonacular returns an array directly
    setRecipes(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    setRecipes([]);
  } finally {
    setLoading(false);
  }
};
const handleFavorite = (recipe) => {
  const alreadySaved = favorites.some((fav) => fav.id === recipe.id);
  let updated;

  if (alreadySaved) {
    updated = favorites.filter((fav) => fav.id !== recipe.id);
  } else {
    updated = [...favorites, recipe];
  }

  setFavorites(updated);
  localStorage.setItem('favorites', JSON.stringify(updated));
};


  return (
    <>
            <main>
        {/* Search Section */}
        <section className="search-section">
          <h2>🔍 Search Recipes by Ingredients</h2>
          <input
            type="text"
            placeholder="e.g. tomato, cheese, basil"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </section>

        {/* Flavor Philosophy */}
        <section id="flavorPhilosophy">
          <h2>🌿 Our Flavor Philosophy</h2>
          <p>{flavorQuote}</p>
        </section>

        {/* Loader */}
       {loading && (
  <div id="loader">
    <div className="loader-spinner"></div>
  </div>
)}


        {/* Results Section */}
        <section id="resultsSection">
          {hasSearched && <h2>🍽️ Recipes</h2>}
          <div id="results">
            

            {hasSearched && !loading && recipes.length === 0 && (
              <p>No recipes found.</p>
            )}

            {Array.isArray(recipes) &&
  recipes.map((recipe, index) => (
  <div key={index} className="recipe-card">
    <h3>{recipe.title}</h3>
    <img src={recipe.image} alt={recipe.title} />
    <a
      href={`https://spoonacular.com/recipes/${recipe.title
        .toLowerCase()
        .replace(/ /g, '-')}-${recipe.id}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View Full Recipe
    </a>
    <button onClick={() => handleFavorite(recipe)}>
      {favorites.some((fav) => fav.id === recipe.id) ? '★ Favorited' : '☆ Favorite'}
    </button>
  </div>
))}


          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
