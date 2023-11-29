const {body, query} = require('express-validator');
const {isPassword, isPhoneNumber} = require('../../Utils/utils.js');

const validateUserSignup = [
    body('nome').notEmpty().withMessage('Campo nome inválido').isLength({min: 3, max: 62}).withMessage('O nome do usuário deve ter entre 3 e 62 caracteres').escape(),
    body('email').notEmpty().withMessage('Campo email inválido').isEmail().withMessage('Email inválido').isLength({max: 42}).escape().withMessage('Email deve ter no máximo 42 caracteres'),
	body('senha').notEmpty().withMessage('Campo senha inválido').isLength({min: 8, max: 32}).withMessage('Senha deve ter entre 8 a 32 caracteres').custom(async pass =>{
		if(!isPassword(pass)){
			throw new Error('Senha inválida. Deve ter pelo menos 1 número e 1 caracter especial (!@#$%^&*])');
		}	
	}),
	body('telefones').notEmpty().custom(async phones =>{
		phones.forEach(phone => {
			if(!isPhoneNumber(`${phone?.ddd}${phone?.numero}`)){
				throw new Error(`Número de telefone inválido: ${phone?.numero}`);
			}
		});
	})
];

const validateUserSignin = [
    body('email').notEmpty().withMessage('Campo email inválido').isEmail().withMessage('Email inválido').isLength({max: 42}).escape().withMessage('Email deve ter no máximo 42 caracteres'),
	body('senha').notEmpty().withMessage('Campo senha inválido').isLength({min: 8, max: 32}).withMessage('Senha deve ter entre 8 a 32 caracteres').custom(async pass =>{
		if(!isPassword(pass)){
			throw new Error('Senha inválida. Deve ter pelo menos 1 número e 1 caracter especial (!@#$%^&*])');
		}	
	})
];

module.exports = {validateUserSignup, validateUserSignin};