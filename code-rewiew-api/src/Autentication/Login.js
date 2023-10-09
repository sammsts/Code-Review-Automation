import axios from 'axios';

export const handleLogin = async (email, senha) => {
    try {
        const response = await axios.get(`https://servidor-codereview-tecnouri.squareweb.app/UsuariosController/validarUsuario?usu_email=${email}&usu_senha=${senha}`);

        if (response.data) {
            return { loggedIn: true };
        } else {
            return { loggedIn: false, error: "Usuário não autenticado" };
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return { loggedIn: false, error: "Erro ao fazer login" };
    }
};
