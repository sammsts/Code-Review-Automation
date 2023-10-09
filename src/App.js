import React from 'react';
import RoutesApp from './routes';
import { AuthProvider } from './Autentication/AuthContext.js';

const App = () => {
  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  );
};

export default App;