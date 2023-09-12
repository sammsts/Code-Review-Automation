import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    // useEffect(() => {
    //     const userToken = localStorage.getItem("user_token");
    //     const usersStorage = localStorage.getItem("users_db");

    //     if (userToken && usersStorage) {
    //         const hasUser = JSON.parse(usersStorage)?.filter(
    //             (user) => user.email === JSON.parse(userToken).email
    //         );

    //         if (hasUser) setUser(hasUser[0]);
    //     }
    // }, []);

    const login = (email, password) => {
        // const usersStorage = JSON.parse(localStorage.getItem("users_db"));
        // const hasUser = usersStorage?.filter((user) => user.email === email);
        if (email && password) {
            async function loginUser(email, password) {
                try {
                  const response = await axios.post('http://localhost:3001/validarUsuario', {
                    email,
                    password,
                  });
                }
                catch (error) {
                    // Trate erros de rede ou outras falhas aqui
                    console.error(error);
                    return "Ocorreu um erro durante a autenticação";
                }
            }

            // if (hasUser[0].email === email && hasUser[0].password === password) {
            //     const token = Math.random().toString(36).substring(2); //token para controle
            //     localStorage.setItem("user_token", JSON.stringify({ email, token }));
            //     setUser({ email, password });
            //     return;
            // }
            // else {
            //     return "Usuário não autenticado";
            // }
        } else {
            return "E-mail e senha devem ser preenchidos";
          }
    };

    const signout = () => {
        setUser(null);
        localStorage.removeItem("user_token");
    };

    return (
        <AuthContext.Provider
            value={{ user, logado: !!user, login, signout}}
        >
            {children}
        </AuthContext.Provider>

    );
};