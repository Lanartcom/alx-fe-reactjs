import { StrictMode } from 'react'; // Ensures your app runs in React's Strict Mode
import { createRoot } from 'react-dom/client'; // React 18+ way of rendering components
import './index.css'; // Includes global styles for your app
import App from './App.jsx'; // Imports the main App component

// Create the root DOM node and render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
