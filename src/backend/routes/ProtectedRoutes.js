import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check if the token exists

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
