import React, { useState } from 'react';

const AddRecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!title || !ingredients || !steps) {
      setError('All fields are required.');
      return;
    }

    if (ingredients.split(',').length < 2) {
      setError('Please list at least two ingredients separated by commas.');
      return;
    }

    // Create the new recipe object
    const newRecipe = {
      id: Date.now(),
      title,
      summary: `Ingredients: ${ingredients.split(',').length} items. Preparation steps provided.`,
      image: 'https://via.placeholder.com/150', // Placeholder image
      ingredients: ingredients.split(',').map((item) => item.trim()),
      steps: steps.split('.').map((step) => step.trim()),
    };

    // Pass the new recipe to the parent handler
    onAddRecipe(newRecipe);

    // Clear the form
    setTitle('');
    setIngredients('');
    setSteps('');
    setError('');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-2xl mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add New Recipe</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipe Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-700 font-medium mb-2">
            Recipe Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the recipe title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ingredients */}
        <div className="flex flex-col">
          <label htmlFor="ingredients" className="text-gray-700 font-medium mb-2">
            Ingredients (comma-separated)
          </label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients separated by commas (e.g., Flour, Sugar, Eggs)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        {/* Steps */}
        <div className="flex flex-col">
          <label htmlFor="steps" className="text-gray-700 font-medium mb-2">
            Preparation Steps (step-separated by periods)
          </label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Enter preparation steps separated by periods (e.g., Preheat oven. Mix ingredients. Bake for 30 minutes.)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
