import React, { useState } from 'react';
import Input from '../../Componentes/Input';
import Button from '../../Componentes/Button';
import * as C from './styles';
import { useAuth } from '../../Autentication/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import logo_tecnouri from './public/logo_tecnouri.png'

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
            <div>
                <img src={logo_tecnouri} alt="Logo tecnoURI" className="logoTecnoURI"/>
            </div>
            <C.Label>AUTENTICAÇÃO DE USUÁRIO</C.Label>
            <C.Content>
                <Input
                    type="email"
                    placeholder="Digite seu Usuário"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type={'password'}
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