const dbConnect = require('./Models/dbConnect.js');
const app = require('./Server.js');

dbConnect().then(()=>{
    app.listen(3500, ()=>{console.log("[ * ] Servidor iniciado");});
});