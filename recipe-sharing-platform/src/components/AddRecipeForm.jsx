import React, { useState } from 'react';

const AddRecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Recipe title is required.';
    }

    if (!ingredients.trim()) {
      newErrors.ingredients = 'Ingredients are required.';
    } else if (ingredients.split(',').length < 2) {
      newErrors.ingredients = 'Please include at least two ingredients.';
    }

    if (!steps.trim()) {
      newErrors.steps = 'Preparation steps are required.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Create the new recipe object
    const newRecipe = {
      id: Date.now(),
      title,
      summary: `Ingredients: ${ingredients.split(',').length} items. Preparation steps provided.`,
      image: 'https://via.placeholder.com/150',
      ingredients: ingredients.split(',').map((item) => item.trim()),
      steps: steps.split('.').map((step) => step.trim()),
    };

    // Pass the new recipe to the parent handler
    onAddRecipe(newRecipe);

    // Clear the form
    setTitle('');
    setIngredients('');
    setSteps('');
    setErrors({});
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mx-auto max-w-2xl mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add New Recipe</h2>
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
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
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
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.ingredients ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            rows="3"
          />
          {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
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
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.steps ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            rows="3"
          />
          {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
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
