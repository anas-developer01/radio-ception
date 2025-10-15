import React from 'react';
import { Navigate } from 'react-router-dom';

// Usage: <ProtectedRoute>...</ProtectedRoute>
const ProtectedRoute = ({ children }) => {
  // You can adjust the key for your auth token as needed
  const isAuthenticated = !!localStorage.getItem('auth');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
