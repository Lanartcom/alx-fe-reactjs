import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useRecipeStore from '../components/recipeStore'

const RecipeList = () => {
  // Accessing the store state with defensive checks
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes) || [] // Ensures it's an array
  const favorites = useRecipeStore((state) => state.favorites) || [] // Ensures it's an array

  // Memoize callbacks to avoid causing re-renders due to new function references
  const addFavorite = useRecipeStore((state) => state.addFavorite)
  const removeFavorite = useRecipeStore((state) => state.removeFavorite)
  const navigate = useNavigate()

  const handleToggleFavorite = useMemo(() => {
    return (id) => {
      if (favorites.includes(id)) {
        removeFavorite(id)
        alert('Removed from favorites!')
      } else {
        addFavorite(id)
        alert('Added to favorites!')
      }
    }
  }, [favorites, addFavorite, removeFavorite])

  return (
    <div>
      <h1>Recipe List</h1>
      {filteredRecipes.length === 0 && <p>No recipes found. Try adjusting your search or filters.</p>}

      {filteredRecipes.map((recipe) => (
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
          <Link to={`/recipe/${recipe.id}`}>View Details</Link>
          <Link to={`/recipe/${recipe.id}/edit`} style={{ marginLeft: '10px' }}>
            Edit
          </Link>
          <button
            onClick={() => handleToggleFavorite(recipe.id)}
            style={{
              marginLeft: '10px',
              color: 'white',
              backgroundColor: favorites.includes(recipe.id) ? 'gray' : 'blue',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            {favorites.includes(recipe.id) ? 'Unfavorite' : 'Favorite'}
          </button>
        </div>
      ))}
    </div>
  )
}

export default RecipeList
