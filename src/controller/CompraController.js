const CompraModel = require('../model/CompraModel.js');
const IngressoModel = require('../model/IngressoModel.js');
const UsuarioModel = require('../model/UsuarioModel.js');

class CompraController {
    
    async getCompras (req, res) {
        const compras = await CompraModel.find({});
        
        return res.status(200).json(compras);
    }

    async getIngressosByUsuario (req, res) {
        
        try {
            const {id} = req.params;

            const ingressosUsuario = await CompraModel.find({id_comprador: id});
            const usuario = await UsuarioModel.findById(id);

            res.render("ingressos", {ingressos: ingressosUsuario, usuario: usuario});
        } catch (error) {
            res.status(500).json({msg: "Internal server error", error: error.message});
        }
    }

    async getIngresso (req, res) {

        try {
            const {id} = req.body;     
            
            const compraIngresso = await CompraModel.findById(id);     
            
            if(compraIngresso) {
                res.render("buscaIngresso", {ingresso: compraIngresso});
            } else {
                res.render("buscaIngresso", {message: "ID da compra não existe"});
            }
        } catch (error) {
            res.status(500).json({msg: "Internal server error", error: error.message})
        }
    }

    async createCompras (req, res) {

        try {
            const {tipo, quantidadeComprada, id_comprador} = req.body;

            const tipoIngresso = await IngressoModel.findOne({nome: tipo});
            const compradorExiste = await UsuarioModel.findOne({_id: id_comprador});

            if(!tipoIngresso) {
                return res.status(404).json({msg: "Erro! Tipo de ingresso não existe"});
            }

            if(!compradorExiste) {
                return res.status(400).json({msg: "Erro! Usuário comprador não existe"});
            }

            if(quantidadeComprada <= tipoIngresso.quantidade && quantidadeComprada !== 0) {     
                
                const compraCriada = await CompraModel.create({
                    tipo: tipo,
                    quantidadeComprada: quantidadeComprada,
                    id_comprador: id_comprador,
                });

                await IngressoModel.updateOne({_id: tipoIngresso._id}, {
                    quantidade: tipoIngresso.quantidade - quantidadeComprada
               });
    
                return res.status(201).json({compraCriada,msg: `${quantidadeComprada} ingressos ${tipoIngresso.nome} comprados com sucesso`});
    
            } else {
                return res.status(400).json({msg: `Estoque insuficiente do ingresso tipo ${tipoIngresso.nome}`});
            }
        } catch (error) {
            res.statua(500).json(error.message);
        }
    }
}

module.exports = new CompraController();