const express = require('express')

const UsuarioController = require('./controller/UsuarioController')

const router = express.Router()

router.get('/usuario', UsuarioController.getUsuarios)
router.post('/usuario/create', UsuarioController.createUsuario)
router.post('/usuario/login', UsuarioController.loginUsuario)

module.exports = router