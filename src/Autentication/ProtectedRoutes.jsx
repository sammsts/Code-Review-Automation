import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation  } from 'react-router-dom';
import { useAuth } from '../Autentication/AuthContext.js';
import Cookies from 'js-cookie';

const ProtectedRoutes = () => {
  const { loggedIn } = useAuth();
  const isLoggedCookie = Cookies.get('isLogged') === 'true';

  if (!loggedIn && !isLoggedCookie) {
    document.title = "Login";
    return <Navigate to="/" />;
  }

  Cookies.set('isLogged', 'true');
  document.title = "Home";
  return <Outlet />;
};

export default ProtectedRoutes;