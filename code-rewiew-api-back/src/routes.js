const { Router } = require('express');
const router = Router();
const UsuariosController = require('./Controllers/UsuariosController');

router.post('/usuarios', UsuariosController.cadastrarUsuario);
router.post('/validarUsuario', UsuariosController.validarUsuario);

module.exports = router;