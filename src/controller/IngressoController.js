const IngressoModel = require('../model/IngressoModel.js');

class IngressoController {

    async getIngresso (req, res) {

        const ingressos = await IngressoModel.find({});

        return res.status(200).json(ingressos);
    }
    
    async createIngresso (req, res) {

        const {nome, preco, quantidade, tipo} = req.body;

        const ingressoExiste = await IngressoModel.findOne({nome: nome});

        if(ingressoExiste) {
            return res.status(400).json({msg: "Tipo de ingresso já existe"});
        }

        const ingresso = new IngressoModel ({
            nome: nome,
            preco: preco,
            quantidade: quantidade,
            tipo: tipo
        });
        const ingressoCriado = await ingresso.save();

        return res.status(201).json({msg: "Ingresso criado", ingressoCriado});
    }

    async updateIngresso (req, res) {
        
        const {id} = req.params;
        const {nome, preco, quantidade} = req.body;

        const ingressoExiste = await IngressoModel.findById(id);

        if(ingressoExiste) {
            await IngressoModel.updateOne({_id: id}, {
                preco: preco,
                quantidade: quantidade
            });
            
            return res.status(200).json({msg: "Ingresso atualizado", nome, preco, quantidade});
        } 
        
        return res.status(404).json({msg: "Ingresso a ser atualizado não existe"});
    } 

    async deleteIngresso (req, res) {
        const {id} = req.params;

        const ingressoExiste = await IngressoModel.findById(id);

        if(ingressoExiste) {
            await IngressoModel.deleteOne({_id: id});
            
            return res.status(200).json({msg: "Ingresso deletado"});
        } 
        
        return res.status(404).json({msg: "Ingresso a ser deletado não existe"});
    }
}

module.exports = new IngressoController();