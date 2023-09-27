import { Usuario } from '../models/Usuarios.js';

async function autenticarUsuario(email, senha) {
  try {
    const usuario = await Usuario.findOne({
      where: {
        usu_email: email,
        usu_senha: senha,
      },
    });

    if (usuario) {
      console.log('Usuário autenticado:', usuario.usu_email);
      return true;
    } else {
      console.log('Usuário não encontrado ou senha incorreta.');
      return false;
    }
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    throw error;
  }
}

export { autenticarUsuario };