const express = require('express')

const UsuarioController = require('./controller/UsuarioController')
const IngressoController = require('./controller/IngressoController')

const tokenAdmin = require('./middleware/tokenAdmin.js');

const router = express.Router()

router.get('/usuario', UsuarioController.getUsuarios)
router.post('/usuario/create', UsuarioController.createUsuario)
router.post('/usuario/login', UsuarioController.loginUsuario)

router.get('/ingresso/', IngressoController.getIngresso);
router.post('/ingresso/create', tokenAdmin.tokenValidoAdmin, IngressoController.createIngresso);
router.put('/ingresso/update/:id', tokenAdmin.tokenValidoAdmin, IngressoController.updateIngresso);
router.delete('/ingresso/delete/:id', IngressoController.deleteIngresso);

module.exports = router