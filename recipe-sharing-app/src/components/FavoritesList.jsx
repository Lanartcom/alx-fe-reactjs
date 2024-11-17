import React, { useMemo } from 'react'
import useRecipeStore from '../components/recipeStore' 

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes)
  const favorites = useRecipeStore((state) => state.favorites)

  // Memoize the computed favorites array to prevent unnecessary renders
  const favoriteRecipes = useMemo(() => {
    return favorites.map((id) => recipes.find((recipe) => recipe.id === id)).filter(Boolean)
  }, [favorites, recipes])

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.length > 0 ? (
        favoriteRecipes.map((recipe) => (
          <div key={recipe.id} style={{ marginBottom: '10px' }}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>You have no favorite recipes. Start adding some!</p>
      )}
    </div>
  )
}

export default FavoritesList
