const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenValidoAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return res.status(401).json({ error: "Token não existe" });
    }

    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({msg: "Acesso negado"});
    }

    try {
        const secret = process.env.SECRET;
        const decodedAdmin = jwt.verify(token, secret); 

        if(decodedAdmin.admin === true) {
            next();
        } else {
            return res.status(400).json({msg: "Erro! Usuário logado não é administrador"});
        }
    } catch (error) {
        return res.status(400).json({msg: "Token inválido", error: error.message});
    }
}

module.exports = {tokenValidoAdmin};