var { autenticarUsuario } = require('../services/UsuariosService.js');

const validarUsuario = async (req, res) => {
  const { usu_email, usu_senha } = req.query;

  try {
    const usuario = await autenticarUsuario(usu_email, usu_senha);
    if (usuario.autenticado) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.error('Erro ao validar usuário na controller:', error);
    return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
}

module.exports = { validarUsuario };