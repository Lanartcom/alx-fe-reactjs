import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'
import EditRecipeForm from './components/EditRecipeForm'
import DeleteRecipeButton from './components/DeleteRecipeButton'

const App = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Recipe Sharing Application</h1>

      {/* Define Routes for different views */}
      <Routes>
        {/* Home route displaying all recipes */}
        <Route path="/" element={<RecipeList />} />

        {/* Route to add a new recipe */}
        <Route path="/add-recipe" element={<AddRecipeForm />} />

        {/* Route to view individual recipe details */}
        <Route path="/recipe/:id" element={<RecipeDetails />} />

        {/* Route to edit an existing recipe */}
        <Route path="/recipe/:id/edit" element={<EditRecipeForm />} />

        {/* Route to delete a recipe */}
        <Route path="/recipe/:id/delete" element={<DeleteRecipeButton />} />
      </Routes>
    </div>
  )
}

export default App
