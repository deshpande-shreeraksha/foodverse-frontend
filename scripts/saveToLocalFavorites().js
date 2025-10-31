

function saveToLocalFavorites(recipe) {

 
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
