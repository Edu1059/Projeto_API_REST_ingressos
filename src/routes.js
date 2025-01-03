const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    return res.status(200).json({ msg: "Bem-vindo ao Sistema de Venda de Ingressos" })
})

module.exports = router