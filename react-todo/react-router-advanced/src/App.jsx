import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import BlogPost from "./pages/BlogPost";

const App = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <div>
          <button onClick={isAuthenticated ? logout : login}>
            {isAuthenticated ? "Logout" : "Login"}
          </button>
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route
              path="/profile/*"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
