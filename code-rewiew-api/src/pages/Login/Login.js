import React, { useState, useEffect } from 'react';
import Input from "../../Componentes/Input";
import Button from "../../Componentes/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom"; 
import { validarUsuario } from '../../controllers/UsuariosController.js';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email | !senha) {
          setError("Preencha todos os campos");
          return;
        }
    
        try {
            const res = await validarUsuario(email, senha);

            if (!res) {
                setError("Usuário não autenticado");
            } else {
                navigate("/commits");
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
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