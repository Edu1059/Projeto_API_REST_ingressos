const mongoose = require('mongoose');

const CompraSchema = mongoose.Schema({
    tipo: String,
    quantidadeComprada: Number,
    id_comprador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
}, {timestamps: true});

module.exports = mongoose.model('Compra', CompraSchema);