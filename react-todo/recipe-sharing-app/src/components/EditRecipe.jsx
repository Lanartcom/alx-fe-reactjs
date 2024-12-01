// src/components/EditRecipe.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const EditRecipe = () => {
  const { id } = useParams();
  const history = useNavigate();
  const { getRecipeById, updateRecipe } = useRecipeStore((state) => ({
    getRecipeById: state.getRecipeById,
    updateRecipe: state.updateRecipe,
  }));

  const recipe = getRecipeById(id);
  const [formData, setFormData] = useState(recipe || {});

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe(id, formData);
    history.push(`/recipe/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipe;
