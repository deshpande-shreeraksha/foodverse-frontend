import React, { useEffect, useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // ✅ Replace with your live backend URL
    fetch('https://foodverse-backend.vercel.app/api/favorites')

      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error('Error fetching favorites:', err));
  }, []);

  return (
    <Router>
      <div style={{ padding: '2rem' }}>
        <h1>🍽️ Favorite Recipes</h1>
        {favorites.length === 0 ? (
          <p>No favorites saved yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {favorites.map((recipe) => (
              <li key={recipe._id} style={{ marginBottom: '2rem' }}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} width="250" />
                <p>
                  <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                    View Recipe
                  </a>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Router>
  );
}

export default App;
