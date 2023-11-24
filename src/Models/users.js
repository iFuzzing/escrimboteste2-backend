const mongoose = require('mongoose');

const telefones = mongoose.Schema({
    numero:{
        type: String,
        required: true
    },
    ddd:{
        type: String,
        required: true
    }
});

const usersModel = mongoose.model('User', new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    },
    telefones: [telefones],
    access_token: {
        type: String,
    },
    data_criacao:{
        type: Date,
        required: true
    },
    data_atualizacao: {
        type: Date,
        required: false
    },
    ultimo_login:{
        type: Date,
        required: false
    }
}));

module.exports = usersModel;