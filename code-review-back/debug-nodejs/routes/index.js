const express = require('express');
const router = express.Router();

router.get('/UsuariosController/validarUsuario/', (req, res) => {
  res.json({ mensagem: 'Requisição GET recebida com sucesso!'});
});

module.exports = router;
