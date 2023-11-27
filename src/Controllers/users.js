const {validationResult} = require('express-validator');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersModel = require('../Models/users');

const userSignup = async (req, res)=>{
    const errResult = validationResult(req);
    if(!errResult.isEmpty()){
        return res.status(400).json({'mensagem': `${errResult.array()[0]?.msg}`});
    }

    const nome = sanitize(req.body.nome);
    const email = sanitize(req.body.email);
    const senha = await bcrypt.hash(req.body.senha, 8);
    const telefones = req.body.telefones;

    let mathUser;
    try {
        mathUser = await usersModel.findOne({
            email: email
        });

    } catch (e) {
       return res.status(500).json({'mensagem': 'Não foi possível verificar usuário'});
    }

    if(mathUser)
        return res.status(409).json({"mensagem": "E-mail já existente"});

    let user;
    try {
        user = await  usersModel.create({
        nome: nome,
        email: email,
        senha: senha,
        telefones: telefones,
        data_criacao: new Date(),
        data_atualizacao: new Date(),
        ultimo_login: new Date(),
        access_token: ''
       });
    } catch (e) {
       return res.status(400).json({'mensagem': 'Falha cadastrar usuário'}); 
    }

    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const access_token = jwt.sign({
        "id": user._id,
        "email": user.email
    },
    ACCESS_TOKEN_SECRET,
    {expiresIn: '30m'}
    );

    user.access_token = await bcrypt.hash(access_token, 8);
    await user.save();

    return res.status(201).json({
            "id": user._id,
            "data_criacao": user.data_criacao,
            "data_atualizacao": user.data_atualizacao,
            "ultimo_login": user.ultimo_login,
            "token": access_token
        }
    );
};

const userSignin = async (req, res)=>{
    const errResult = validationResult(req);
    if(!errResult.isEmpty()){
        return res.status(400).json({'mensagem': `${errResult.array()[0]?.msg}`});
    }

    const email = sanitize(req.body.email);
    const senha = sanitize(req.body.senha);

    let user;
    try {
       user = await usersModel.findOne({
        "email": email,
       }); 
    } catch (e) {
       return res.status(500).json({"mensagem": "Não foi possível realizar o login"}); 
    }

    if(!user)
       return res.status(401).json({"mensagem": "Usuário e/ou senha inválidos"}); 

    
    const senhaMath = await bcrypt.compare(senha,  user.senha);
    if(!senhaMath)
       return res.status(401).json({"mensagem": "Usuário e/ou senha inválidos"}); 

    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const access_token = jwt.sign({
        "id": user._id,
        "email": user.email
    },
    ACCESS_TOKEN_SECRET,
    {expiresIn: '30m'}
    );

    user.ultimo_login = new Date();
    user.access_token = await bcrypt.hash(access_token, 8); 
    await user.save();

    return res.json({
            "id": user._id,
            "data_criacao": user.data_criacao,
            "data_atualizacao": user.data_atualizacao,
            "ultimo_login": user.ultimo_login,
            "token": access_token
        }
    );
};

const userInfo = async (req, res)=>{

    const email = res.email;
    const id = res.id;

    let user;
    try {
       user = await usersModel.findOne({email: email, _id: id}); 
    } catch (e) {
       return res.status(500).json({"mensagem": "Não foi possível realizar a consulta"}); 
    }

    if(!user)
        return res.json({"mensagem": "Usuário não encontrado"});

    return res.json({
            "nome": user.nome,
            "email": user.email,
            "telefones": user.telefones,
        }
    );
};

module.exports = {userSignup, userSignin, userInfo};