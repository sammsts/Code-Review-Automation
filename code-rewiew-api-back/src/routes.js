const { Router } = require('express');
const router = Router();
const UsuariosController = require('./Controllers/UsuariosController');

router.post('/usuarios', UsuariosController.cadastrarUsuario);

module.exports = router;