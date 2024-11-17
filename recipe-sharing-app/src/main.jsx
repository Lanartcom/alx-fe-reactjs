import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Ensure your styles are included
import App from './App'

// Render the application
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
