const { default: mongoose } = require("mongoose");

const dbConnect = async ()=>{
    console.log("[ * ] Conectando ao banco de dados...");
    let databaseUri
    try{
        databaseUri = process.env.DATABASE_URI;
    }catch(e){
        throw new Error("Variável de ambiente DATABASE_URI não configurada");
    }

    try {
       await mongoose.connect(databaseUri);
    } catch (e) {
        console.log(e);
        throw new Error("Falha ao conectar com o banco de dados"); 
    }

    console.log("[ * ] Banco de dados conectado");
}

module.exports = dbConnect;