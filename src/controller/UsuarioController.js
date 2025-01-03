const jwt = require('jsonwebtoken');
const UsuarioModel = require('../model/UsuarioModel.js');

require('dotenv').config();

class UsuarioController {

    async getUsuarios (req, res) {
    
        const usuarios = await UsuarioModel.find({});
    
        return res.status(200).json(usuarios);
    }

    async createUsuario (req, res) {

        const {nome, senha, admin} = req.body;

        try {
            
            if(await UsuarioModel.findOne({nome: nome})) {

                return res.status(400).json({msg: "Usuário já existe"});

            } else {
                const usuarioCriado = await UsuarioModel.create({
                    nome: nome,
                    senha: senha,
                    admin: admin
                });
                return res.status(200).json(usuarioCriado);
            }
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async loginUsuario (req, res) {

        const {nome, senha, admin} = req.body;

        const usuarioExiste = await UsuarioModel.findOne({nome: nome, senha: senha});
        
        try {
           
            if(!usuarioExiste) {
                return res.status(404).json({msg: "Usuário não encontrado"});
            } else {
                const secret = process.env.SECRET;
                const token = jwt.sign({
                    _id: usuarioExiste._id,
                    nome,
                    admin: usuarioExiste.admin,
                }, secret);
                
                return res.status(200).json({msg: "Usuario logado com sucesso", nome: nome, senha: senha, token});
            }

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new UsuarioController();
