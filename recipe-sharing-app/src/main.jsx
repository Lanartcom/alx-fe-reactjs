import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Ensure your styles are included
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
])

// Render the application
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
