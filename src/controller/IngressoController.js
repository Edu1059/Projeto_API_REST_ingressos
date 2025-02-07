const IngressoModel = require('../model/IngressoModel.js');

class IngressoController {

    async getIngresso (req, res) {

        const ingressos = await IngressoModel.find({});

        return res.status(200).json(ingressos);
    }
    
    async createIngresso (req, res) {

        const {nome, preco, quantidade, tipo} = req.body;

        try {
            const ingressoExiste = await IngressoModel.findOne({nome: nome});
            
            if(ingressoExiste) {
                return res.status(400).json({msg: "Tipo de ingresso já existe"});
            }

            if(preco < 0) {
                return res.status(400).json({msg: "Preço não deve ser negativo"});
            }

            if(quantidade < 0) {
                return res.status(400).json({msg: "Quantidade de ingresso não pode ser negativa"});
            }
    
            const ingresso = new IngressoModel ({
                nome: nome,
                preco: preco,
                quantidade: quantidade,
                tipo: tipo
            });
            const ingressoCriado = await ingresso.save();
    
            return res.status(201).json({msg: "Ingresso criado", ingressoCriado});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }

    async updateIngresso (req, res) {
        
        const {id} = req.params;
        const {nome, preco, quantidade} = req.body;

        try {
            const ingressoExiste = await IngressoModel.findById(id);
            const dadoIdentico = await IngressoModel.findOne({nome: nome});
    
            if(!ingressoExiste) {
                return res.status(404).json({msg: "Ingresso a ser atualizado não existe"});
            } 
    
            if(dadoIdentico) {
                return res.status(400).json({message: `Ingresso ${nome} já existe`});
            }
    
            await IngressoModel.updateOne({_id: id}, {
                nome: nome,
                preco: preco,
                quantidade: quantidade
            });
            
            return res.status(200).json({msg: "Ingresso atualizado", nome, preco, quantidade});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    } 

    async deleteIngresso (req, res) {
        const {id} = req.params;

        try {
            const ingressoExiste = await IngressoModel.findById(id);
    
            if(ingressoExiste) {
                await IngressoModel.deleteOne({_id: id});
                
                return res.status(200).json({msg: "Ingresso deletado"});
            } 
            
            return res.status(404).json({msg: "Ingresso a ser deletado não existe"});
        } catch (error) {
            return res.status(500).json({message: "ID ingresso inválido", error: error.message});
        }
    }
}

module.exports = new IngressoController();