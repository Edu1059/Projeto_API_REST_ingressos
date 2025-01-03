const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nome: String,
    senha: String,
    admin: Boolean,
}, {timestamps: true});

module.exports = mongoose.model('Usuario', UsuarioSchema);