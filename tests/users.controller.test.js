require('./common.test.js');
const {validationResult} = require('express-validator');
const {userSignup, userSignin, userInfo} = require('../src/Controllers/users.js');
const usersModel = require('../src/Models/users.js');
const bcrypt = require('bcrypt');

jest.mock('express-validator', ()=>({
    validationResult: jest.fn()
}));

jest.mock('../src/Models/users.js', ()=>{
    return {
        findOne: jest.fn(),
        create: jest.fn(),
    };
});

jest.mock('bcrypt');

describe('Controller tests start', () => {

    let jsonMock, statusMock, res;
    beforeEach(()=>{
        jsonMock = jest.fn((obj)=>obj);
        statusMock = jest.fn(()=>({json: jsonMock}));
        res = {status: statusMock, json: jest.fn((obj)=>(obj))};
        validationResult.mockReturnValue({isEmpty: ()=>true, array: ()=> []});
    });

   it('userSingup: registra um usuário no sistema', async ()=>{
        const req = {
            body:{
                nome: 'Michael Scott',
                email: 'michael.scott@dundermifflin.com',
                senha: 'ThatsWhatSheSaidEver',
                telefones: [{numero: '123456789', ddd: '11'}]
            }
        };

        usersModel.findOne.mockReturnValue(null);
        const user = {
            _id: 'id',
            email: req.body.email,
            data_criacao: new Date(),
            data_atualizacao: new Date(),
            ultimo_login: new Date(),
            access_token: '',
        };

        usersModel.create.mockReturnValue({...user, save: jest.fn()});
        await userSignup(req, res);

        let result = jsonMock.mock.results[0].value;

        result._id = result.id;
        delete result.id; 
        delete result.token; 

        expect(user).toEqual(expect.objectContaining(result));
   });

   it('userSigin: autentica o usuário', async ()=>{
        const req = {
            body:{
                email: 'jimhalpert@dundermifflin.com',
                senha: 'CeceliaPhillipP@m'
            }
        };

        let findOneResultPart = {
            _id: 'id',
            data_criacao: new Date(),
            data_atualizacao: new Date(),
            ultimo_login: new Date(),
        };

        usersModel.findOne.mockReturnValue({
            ...req.body,
            ...findOneResultPart,
            save: jest.fn()
        });

        bcrypt.compare.mockReturnValue(true);
        await userSignin(req, res);

        findOneResultPart.id = findOneResultPart._id;
        delete findOneResultPart._id;
        
        const result = res.json.mock.results[0].value;
        delete result.token;
        delete result.ultimo_login;

        expect(findOneResultPart).toEqual(expect.objectContaining(result));
   });

   it('userInfo: obtém informações sobre o usuário autenticado', async ()=>{
        res.email = "dwightschrute@dundermifflin.com";
        res.id = "id";

        const user = {
            nome: "Dwight Schrute",
            email: res.email,
            telefones: [{numero: '123456789', ddd: '11'}],
            _id: res.id
        };

        await usersModel.findOne.mockReturnValue(user);
        await userInfo(null, res);

        const result = res.json.mock.results[0].value;
        delete user._id;

        expect(result).toEqual(user);
   });
});
