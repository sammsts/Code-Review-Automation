import { autenticarUsuario } from '../services/UsuariosService.js';

async function validarUsuario(usu_nome, usu_senha) {
  try {
    const usuario = await autenticarUsuario(usu_nome, usu_senha);
  } catch (err) {
    console.error('Erro ao validar usuário na controller:', err);
  }
}

export { validarUsuario };