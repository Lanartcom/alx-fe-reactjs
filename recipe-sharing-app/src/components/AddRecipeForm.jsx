import { useState } from 'react'
import useRecipeStore from './recipeStore' // Remove curly braces here
import { useNavigate } from 'react-router-dom'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const history = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    // Basic validation to prevent empty submissions
    if (!title.trim() || !description.trim()) {
      alert('Please fill in both the title and description')
      return
    }

    // Add the new recipe to the store
    addRecipe({ id: Date.now(), title, description })

    // Clear form inputs
    setTitle('')
    setDescription('')

    // Navigate back to the home (recipe list) page
    history('/')
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          style={{ padding: '10px', width: '100%', height: '100px' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>
        Add Recipe
      </button>
    </form>
  )
}

export default AddRecipeForm
