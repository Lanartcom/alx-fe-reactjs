import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useRecipeStore from '../components/recipeStore' // Adjust the import path if necessary

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe)
  const navigate = useNavigate() // Replaces useHistory

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id)
      alert('Recipe deleted successfully!')
    }
  }

  return (
    <div>
      <h1>Recipe List</h1>
      {recipes.length === 0 && <p>No recipes available. Add a new recipe!</p>}

      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>

          {/* Links to view and edit individual recipes */}
          <Link to={`/recipe/${recipe.id}`}>View Details</Link>
          <Link to={`/recipe/${recipe.id}/edit`} style={{ marginLeft: '10px' }}>
            Edit
          </Link>

          {/* Delete button */}
          <button
            onClick={() => handleDelete(recipe.id)}
            style={{
              marginLeft: '10px',
              color: 'white',
              backgroundColor: 'red',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Link to add a new recipe */}
      <div style={{ marginTop: '20px' }}>
        <Link
          to="/add-recipe"
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: 'green',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
        >
          Add New Recipe
        </Link>
      </div>
    </div>
  )
}

export default RecipeList
