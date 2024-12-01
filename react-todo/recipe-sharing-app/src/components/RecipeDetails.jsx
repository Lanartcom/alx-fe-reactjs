import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useRecipeStore from '../components/recipeStore' // Adjust import path if needed
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'

const RecipeDetails = () => {
  const { id } = useParams() // Get recipe ID from the URL
  const navigate = useNavigate() // Hook for navigation
  const recipeId = Number(id) // Parse ID to a number
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  )

  // If recipe is not found, show a "not found" message and redirect after a timeout
  if (!recipe) {
    setTimeout(() => {
      navigate('/')
    }, 3000)

    return <div>Recipe not found. Redirecting to home...</div>
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Steps:</h3>
      <p>{recipe.steps}</p>

      {/* Render EditRecipeForm and DeleteRecipeButton */}
      <h2>Edit Recipe</h2>
      <EditRecipeForm recipe={recipe} />

      <DeleteRecipeButton recipeId={recipe.id} />

      {/* Back button */}
      <button onClick={() => navigate('/')}>Back to Recipes</button>
    </div>
  )
}

export default RecipeDetails
