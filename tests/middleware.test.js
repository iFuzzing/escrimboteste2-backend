require('./common.test');
const routeProtection = require('../src/Middleware/Protections/routeProtection');

describe('Middle tests start', () => {
    describe('routeProtecion', () => {
        it('verifica se o token é valido, deve retornar sessão inválida', async () => {
            const req = {
                headers:{
                    authorization: 'Barear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjQ4ZTliNTZjMzY0NzAxMmM0NGJmOSIsImVtYWlsIjoiZW1haWxAZW1haWwxLmNvbSIsImlhdCI6MTcwMTE5OTIwOCwiZXhwIjoxNzAxMjAxMDA4fQ.nybJhQlYpjp88q0xRnM-RZdafsv_7pnzrVs_JwpVySE'
                },
            };
            
            const jsonMock = jest.fn((obj)=>obj);
            const statusMock = jest.fn((code)=>({json: jsonMock}));
            const res = {
                status: statusMock
            };

            const next = jest.fn(true);
            await routeProtection(req, res, next);
            expect(jsonMock.mock.results[0].value.mensagem).toEqual('Sessão inválida');
        });
    });
});