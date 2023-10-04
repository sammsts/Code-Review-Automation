import React, { useState } from 'react';
import Input from '../../Componentes/Input';
import Button from '../../Componentes/Button';
import * as C from './styles';
import { useAuth } from '../../Autentication/AuthContext.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        if (!email && !senha) {
            setError("Preencha todos os campos");
            return;
        }

        try {
            const result = await login(email, senha);
            if (result.loggedIn) {
                navigate('/commits');
              } else {
                setError(result.error);
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="senha"
                    placeholder="Digite sua Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <C.labelError>{error}</C.labelError>
                <Button Text="Entrar" onClick={handleLoginClick} />
            </C.Content>
        </C.Container>
    );
};

export default Login;