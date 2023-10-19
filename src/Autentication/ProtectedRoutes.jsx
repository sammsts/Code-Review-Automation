import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Autentication/AuthContext.js';

const ProtectedRoutes = () => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    document.title = "Login";
    return <Navigate to="/" />;
  }

  document.title = "Home";
  return <Outlet />;
};

export default ProtectedRoutes;