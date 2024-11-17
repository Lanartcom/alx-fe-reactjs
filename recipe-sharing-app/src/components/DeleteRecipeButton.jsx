// src/components/DeleteRecipeButton.jsx
import React from 'react';
import useRecipeStore from './recipeStore';
import {useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const history = useNavigate();

  const handleDelete = () => {
    // Delete the recipe by ID
    deleteRecipe(recipeId);

    // Navigate back to the home page after deletion
    history.push('/');
  };

  return (
    <button
      onClick={handleDelete}
      style={{ padding: '10px 15px', cursor: 'pointer', color: 'white', backgroundColor: 'red' }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
