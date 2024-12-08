import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  // Load recipe data from the local JSON file
  useEffect(() => {
    fetch('/src/data.json')
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error loading recipes:', error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Recipe Sharing Platform</h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{recipe.title}</h2>
                <p className="text-gray-600 mt-2">{recipe.summary}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
