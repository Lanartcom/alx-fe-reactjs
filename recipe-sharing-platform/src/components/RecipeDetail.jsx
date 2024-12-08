import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null); // State to store the recipe data
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch recipe data from data.json
    fetch('/src/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch recipe data');
        }
        return response.json();
      })
      .then((data) => {
        const foundRecipe = data.find((recipe) => recipe.id === parseInt(id, 10));
        if (!foundRecipe) {
          setError('Recipe not found!');
        } else {
          setRecipe(foundRecipe);
        }
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!recipe) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-4"
      >
        Back
      </button>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-gray-700 mb-4">{recipe.summary}</p>
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal list-inside text-gray-700">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="mb-2">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
