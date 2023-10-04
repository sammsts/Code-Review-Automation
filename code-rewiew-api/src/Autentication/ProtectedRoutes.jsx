import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Autentication/AuthContext.js';

const ProtectedRoutes = () => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    //pagina de login se não for autenticado
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;