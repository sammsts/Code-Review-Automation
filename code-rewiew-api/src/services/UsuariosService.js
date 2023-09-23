import { autenticar } from '../models/Usuarios.js';

const autenticarUsuario = async (nome, senha) => {
  try {
    const validacaoUsuario = await autenticar(nome, senha);
    if (validacaoUsuario) {
      return true;
    }
    return false;
  } catch (err) {
    console.error('Erro ao validar usuário na Service:', err);
    throw new Error('Erro ao validar usuário.');
  }
};
  
export { autenticarUsuario };