import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockRecipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    summary: 'A classic Italian pasta dish with eggs, cheese, bacon, and black pepper.',
    image: 'https://i.ibb.co/Z6ZM0NB/Spaghetti-Carbonara.png',
    ingredients: ['Spaghetti', 'Eggs', 'Pecorino Romano cheese', 'Guanciale', 'Black pepper'],
    steps: [
      'Boil spaghetti in salted water until al dente.',
      'Fry guanciale in a pan until crispy.',
      'Whisk eggs and cheese together in a bowl.',
      'Combine spaghetti and guanciale in the pan.',
      'Off heat, add egg mixture to the pasta and toss quickly.',
      'Season with black pepper and serve immediately.'
    ],
  },
  {
    id: 2,
    title: 'Chicken Tikka Masala',
    summary: 'Chunks of grilled chicken (tikka) cooked in a smooth buttery & creamy tomato-based gravy.',
    image: 'https://i.ibb.co/RvjnZXD/Chicken-Tikka-Masala.png',
    ingredients: ['Chicken', 'Yogurt', 'Tomato sauce', 'Heavy cream', 'Spices (garam masala, turmeric, cumin)', 'Garlic', 'Ginger'],
    steps: [
      'Marinate chicken in yogurt and spices for 4 hours.',
      'Grill or pan-fry chicken until slightly charred.',
      'In a separate pan, prepare the sauce with tomato sauce, cream, and spices.',
      'Add cooked chicken to the sauce and simmer for 15 minutes.',
      'Serve with basmati rice or naan bread.'
    ],
  },
  {
    id: 3,
    title: 'Vegetable Stir Fry',
    summary: 'A quick and healthy dish featuring colorful vegetables sautéed in a savory sauce.',
    image: 'https://i.ibb.co/JjL1MDT/Vegetable-Stir-Fry.png',
    ingredients: ['Broccoli', 'Carrots', 'Bell peppers', 'Soy sauce', 'Garlic', 'Ginger', 'Sesame oil'],
    steps: [
      'Heat sesame oil in a wok or large skillet.',
      'Add minced garlic and ginger and sauté until fragrant.',
      'Add vegetables and stir-fry until tender-crisp.',
      'Mix soy sauce with a splash of water and pour over the vegetables.',
      'Toss everything together and cook for 2 more minutes.',
      'Serve hot over steamed rice.'
    ],
  },
];

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the recipe based on the id parameter
  const recipe = mockRecipes.find((recipe) => recipe.id === parseInt(id, 10));

  if (!recipe) {
    return <p className="text-center text-gray-700">Recipe not found!</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mb-4"
      >
        Back
      </button>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-gray-700 mb-4">{recipe.summary}</p>
          <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-2">Preparation Steps</h2>
          <ol className="list-decimal list-inside text-gray-700">
            {recipe.steps.map((step, index) => (
              <li key={index} className="mb-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
