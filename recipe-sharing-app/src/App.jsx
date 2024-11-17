import React from 'react';
import AddRecipeForm from './components/AddRecipeForm'; // Corrected import
import RecipeList from './components/RecipeList'; // Corrected import

const App = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Recipe Sharing Application</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
};

export default App;
