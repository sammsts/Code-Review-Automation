import React, { useState, useEffect } from 'react';
import Input from "../../Componentes/Input";
import Button from "../../Componentes/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
 import useAuth from "../../hooks/useAuth";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email | !senha) {
          setError("Preencha todos os campos");
          return;
        }
    
        const res = login(email, senha);
    
        if (res) {
          setError(res);
          return;
        }
    
        navigate("/commits");
      };

    return (
        <C.Container>
            <C.Label>AUTENTICAÇÃO DE USUÁRIO</C.Label>
            <C.Content>
                <Input
                    type="email"
                    placeholder="Digite seu E-mail"
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError("")]}
                />
                <Input
                    type="senha"
                    placeholder="Digite sua Senha"
                    value={senha}
                    onChange={(e) => [setSenha(e.target.value), setError("")]}
                />
                <C.labelError>{error}</C.labelError>
                <Button Text="Entrar" onClick={handleLogin} />
            </C.Content>
        </C.Container>
    );
};

export default Login