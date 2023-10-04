import { useState } from 'react';
import { handleLogin } from "../Autentication/Login.js";

const useAuthentication = () => {
  const [authState, setAuthState] = useState({ loggedIn: false, error: "" });

  const authenticate = async (email, senha) => {
    const result = await handleLogin(email, senha);
    setAuthState(result);
  };

  return { ...authState, authenticate };
};

export default useAuthentication;