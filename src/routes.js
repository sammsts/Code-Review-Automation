import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Commits from './pages/Home/Commits';
import ProtectedRoutes from './Autentication/ProtectedRoutes';

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/commits" element={<Commits />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;