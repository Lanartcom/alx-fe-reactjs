import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddRecipeForm from './AddRecipeForm';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  // Load initial recipe data
  useEffect(() => {
    fetch('/src/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        return response.json();
      })
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error loading recipes:', error));
  }, []);

  // Add a new recipe
  const handleAddRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  return (
    <div className="w-full min-h-screen bg-yellow-200">
      <div className="w-full px-6">
        <h1 className="text-3xl font-bold text-center mb-6">Recipe Sharing Platform</h1>
        <AddRecipeForm onAddRecipe={handleAddRecipe} />
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {recipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
                  <p className="text-gray-600 mt-2">{recipe.summary}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
