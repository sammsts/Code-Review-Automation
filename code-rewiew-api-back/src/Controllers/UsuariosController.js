const UsuariosService = require('../Controllers/UsuariosController');
const { cadastrarUsuarios } = UsuariosService;

const cadastrarUsuario = async (req, res) => {
  try {
    const { usu_nome, usu_senha } = req.body;
    const usuario = await UsuariosService.cadastrarUsuario(usu_nome, usu_senha);
    res.status(201).json(usuario);
  } catch (err) {
    console.error('Erro ao cadastrar usuário na controller:', err);
    res.status(500).send('Erro ao cadastrar usuário.');
  }
};

module.exports = {
  cadastrarUsuario,
};
