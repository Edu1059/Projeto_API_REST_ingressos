const express = require('express')

const UsuarioController = require('./controller/UsuarioController')
const IngressoController = require('./controller/IngressoController')
const CompraController = require('./controller/CompraController')

const tokenAuth = require('./middleware/tokenAuth.js');
const tokenAdmin = require('./middleware/tokenAdmin.js');

const router = express.Router()

router.get('/', (req, res) => {
    return res.render("inicial", {message: "Bem-vindo ao sistema de vendas de ingressos 2025"})
});

router.get('/usuario', UsuarioController.getUsuarios)

router.get('/usuario/create', (req, res) => { res.render("create") })
router.post('/usuario/create', UsuarioController.createUsuario)

router.get('/usuario/login', (req, res) => { res.render("login") })
router.post('/usuario/login', UsuarioController.loginUsuario)

router.get('/ingresso/', IngressoController.getIngresso);
router.post('/ingresso/create', tokenAdmin.tokenValidoAdmin, IngressoController.createIngresso);
router.put('/ingresso/update/:id', tokenAdmin.tokenValidoAdmin, IngressoController.updateIngresso);
router.delete('/ingresso/delete/:id', IngressoController.deleteIngresso);

router.get('/compra/', CompraController.getCompras);
router.get('/compra/:id', CompraController.getIngressoByUsuario);
router.post('/compra/create', tokenAuth.tokenValido, CompraController.createCompras);

module.exports = router