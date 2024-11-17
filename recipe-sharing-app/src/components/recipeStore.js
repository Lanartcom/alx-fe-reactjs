import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],

  addFavorite: (recipeId) => {
    set((state) => {
      if (!state.favorites.includes(recipeId)) {
        return { favorites: [...state.favorites, recipeId] }
      }
      return state
    })
  },

  removeFavorite: (recipeId) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    }))
  },

  generateRecommendations: () => {
    if (!get().favorites.length) return // Prevent unnecessary updates
    set((state) => {
      const recommended = state.recipes.filter((recipe) =>
        state.favorites.includes(recipe.id) && Math.random() > 0.5
      )
      return { recommendations: recommended }
    })
  },

  getFavoriteRecipes: () => {
    const { favorites, recipes } = get()
    return favorites.map((id) => recipes.find((recipe) => recipe.id === id)).filter(Boolean)
  },
}))

export default useRecipeStore
