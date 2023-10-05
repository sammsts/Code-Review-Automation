var express = require('express');
var router = express.Router();

const UsuariosController = require('../../controllers/UsuariosController.js');
router.get('/UsuariosController/validarUsuario', UsuariosController.validarUsuario);


module.exports = router;