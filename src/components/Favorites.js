import React, { useState, useEffect } from 'react';

import Footer from './Footer';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const handleRemove = (id) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <>
      
      <main>
        <h2>❤️ Your Favorite Recipes</h2>
        <div className="card-grid">
          {favorites.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            favorites.map((recipe) => (
              <div key={recipe.id} className="card">
                <img src={recipe.image} alt={recipe.title} />
                <h3>{recipe.title}</h3>
                <a
                  href={`https://spoonacular.com/recipes/${recipe.title
                    .toLowerCase()
                    .replace(/ /g, '-')}-${recipe.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Full Recipe
                </a>
                <button onClick={() => handleRemove(recipe.id)}>
                  ★ Remove Favorite
                </button>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Favorites;
