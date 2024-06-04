import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Commits from './pages/Home/Commits';

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Commits />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;