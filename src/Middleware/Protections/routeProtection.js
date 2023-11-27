const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersModel = require('../../Models/users.js');

const routeProtection = async (req, res, next)=>{
    const reqAuthHeader = req.headers.authorization;
    if(!reqAuthHeader)
        return res.status(401).json({"mensagem": "Não autorizado"});

    
    const reqToken = reqAuthHeader.split(' ')[1];

    let errTokenMsg = "";
    await jwt.verify(
        reqToken,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, tokenDecoded)=>{
            if(err){
                if(err.expiredAt)
                    errTokenMsg = "Sessão inválida";
                else
                    errTokenMsg = "Não autorizado";
            }else{

                let user;
                try {
                   user = await usersModel.findOne({email: tokenDecoded.email});
                } catch (e) {
                    errTokenMsg = "Não autorizado";
                    return;
                }

                const tokenMath = await bcrypt.compare(reqToken, user.access_token);
                if(!user || !tokenMath){
                    errTokenMsg = "Sessão inválida";
                    return;
                }

                res.email = tokenDecoded.email;
                res.id = tokenDecoded.id;
            }
        });

        if(errTokenMsg){
            return res.status(401).json({"mensagem": errTokenMsg});
        }

        next();
};

module.exports = routeProtection;