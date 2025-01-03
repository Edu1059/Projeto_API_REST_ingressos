const mongoose = require('mongoose');

const IngressoSchema = mongoose.Schema({
    nome: String,
    preco: Number,
    quantidade: Number,
}, {timestamps: true});

module.exports = mongoose.model('Ingresso', IngressoSchema);