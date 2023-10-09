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
    const [showPassword, setShowPassword] = useState(false);

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
                    placeholder="Digite seu Usuário"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div style={{ position: 'relative' }}>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Digite sua Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    {senha && (
                        <span
                            id="show-password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                            >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </span>
                    )}
                </div>
                <C.labelError>{error}</C.labelError>
                <Button Text="Entrar" onClick={handleLoginClick} />
            </C.Content>
        </C.Container>
    );
};

export default Login;