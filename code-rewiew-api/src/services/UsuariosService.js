const { Validar } = require('../models/usuario');

const validarUsuario = async (nome, senha) => {
  try {
    const validacaoUsuario = await Validar(nome, senha);
    if (validacaoUsuario) {
      return true;
    }
    return false;
  } catch (err) {
    console.error('Erro ao validar usuário na Service:', err);
    throw new Error('Erro ao validar usuário.');
  }
};

module.exports = {
    validarUsuario,
};