// src/components/EditRecipeForm.jsx
import React, { useState } from 'react';
import useRecipeStore from './recipeStore';
import { useNavigate } from 'react-router-dom';

const EditRecipeForm = ({ recipe }) => {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const history = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the recipe with new details
    updateRecipe({ ...recipe, title, description });

    // Navigate back to the recipe details page
    history.push(`/recipe/${recipe.id}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ padding: '10px', width: '100%', height: '100px' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
        Save Changes
      </button>
    </form>
  );
};

export default EditRecipeForm;
