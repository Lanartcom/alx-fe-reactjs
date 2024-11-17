import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],

  // Action to add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  // Action to set the recipes (initialize or replace the whole list)
  setRecipes: (recipes) => set({ recipes }),

  // Action to delete a recipe by its ID
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),

  // Action to update a recipe by its ID
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),

  // Selector to get a recipe by its ID
  getRecipeById: (id) => {
    const { recipes } = get()
    return recipes.find((recipe) => recipe.id === id)
  },
}))

// Function to get all recipes
export const getAllRecipes = () => {
  const { recipes } = useRecipeStore.getState()
  return recipes
}

export default useRecipeStore
