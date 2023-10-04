import { handleLogin } from './Login';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ loggedIn: false, error: null });

  const login = async (email, senha) => {
    try {
      const result = await handleLogin(email, senha);

      if (result.loggedIn) {
        setAuthState({ loggedIn: true, error: null });
        return { loggedIn: true, error: null };
      } else {
        setAuthState({ loggedIn: false, error: 'Negado' });
        return { loggedIn: false, error: 'Usuário não autenticado' };
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setAuthState({ loggedIn: false, error: 'Erro ao autenticar' });
    }
  };


  return (
    <AuthContext.Provider value={{ ...authState, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};