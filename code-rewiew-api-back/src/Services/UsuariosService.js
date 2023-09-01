const { Usuario } = require('../models/usuario');

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
