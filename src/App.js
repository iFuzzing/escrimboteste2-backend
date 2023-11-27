const dotenv = require('dotenv');
const dbConnect = require('./Models/dbConnect.js');
const app = require('./Server.js');

dotenv.config();
dbConnect().then(()=>{
    app.listen(3500, ()=>{console.log("[ * ] Servidor iniciado");});
});