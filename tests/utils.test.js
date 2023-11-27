const {isPhoneNumber, isPassword} = require('../src/Utils/utils.js');

describe("Utils tests start", ()=>{
    it("isPhoneNumber: é um número de telefone válido", ()=>{
        const goodPhone = "81123456789";
        const badPhone = "123456789";

        let result = isPhoneNumber(goodPhone);
        expect(result).toEqual(true);
        
        result = isPhoneNumber(badPhone);
        expect(result).toEqual(false);
    });

    it("isPassword: é uma senha válida", ()=>{
        const goodPass = "p@ss1234";
        const badPass = "pass123";

        let result = isPassword(goodPass);
        expect(result).toEqual(true);

        result = isPassword(badPass);
        expect(result).toEqual(false);
    });
});