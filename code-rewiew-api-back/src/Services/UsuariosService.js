const { Usuario } = require('../models/usuario');
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

const cadastrarUsuarios = async (nome, senha) => {
  try {
    const usuario = await Usuario.create({ nome, senha });
    return usuario;
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    throw new Error('Erro ao cadastrar usuário.');
  }
};

module.exports = {
  cadastrarUsuarios,
};
