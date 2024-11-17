import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '', // State to hold the search term
  filteredRecipes: [], // State to hold filtered recipes

  // Action to add a new recipe and reapply filters
  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe]
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase())
        ),
      }
    }),

  // Action to set the recipes (initialize or replace the whole list) and reapply filters
  setRecipes: (recipes) => {
    set({
      recipes,
      filteredRecipes: recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase())
      ),
    })
  },

  // Action to delete a recipe by its ID and reapply filters
  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id)
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase())
        ),
      }
    }),

  // Action to update a recipe by its ID and reapply filters
  updateRecipe: (id, updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map(recipe =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(get().searchTerm.toLowerCase())
        ),
      }
    }),

  // Action to set the search term and filter recipes accordingly
  setSearchTerm: (term) => {
    set({ searchTerm: term })
    get().filterRecipes() // Reapply filters when the search term is updated
  },

  // Action to filter recipes based on the current search term
  filterRecipes: () => {
    set((state) => ({
      filteredRecipes: state.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    }))
  },

  // Selector to get a recipe by its ID
  getRecipeById: (id) => {
    const { recipes } = get()
    return recipes.find(recipe => recipe.id === id)
  },
}))

// Function to get all recipes
export const getAllRecipes = () => {
  const { recipes } = useRecipeStore.getState()
  return recipes
}

export default useRecipeStore
