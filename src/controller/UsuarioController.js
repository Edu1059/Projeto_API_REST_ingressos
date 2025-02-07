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
                const mensagemErro = `Usuário ${nome} já existe`
                res.render("create", {mensagemErro})

            } else {
                await UsuarioModel.create({
                    nome: nome,
                    senha: senha,
                    admin: admin
                });
                
                const created = true
                res.render("create", {message: "Cadastro de Usuário", created: created, nome: nome, senha: senha, admin: admin})
            }
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async loginUsuario (req, res) {

        const {nome, senha, admin} = req.body;
        const logged = true;

        const usuarioExiste = await UsuarioModel.findOne({nome: nome, senha: senha, admin: admin});
        
        try {
           
            if(!usuarioExiste) {
                res.render("login", {info: `Usuário não existe`})
            } else {
                const secret = process.env.SECRET;
                const token = jwt.sign({
                    _id: usuarioExiste._id,
                    nome,
                    admin: usuarioExiste.admin,
                }, secret);
                
                res.render("login", {message: "Login de Usuário", nome: nome, senha: senha, token: token, logged: logged, id: usuarioExiste.id})
            }

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new UsuarioController();