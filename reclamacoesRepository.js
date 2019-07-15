const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/Reclamacoes'

function connect (){
    mongoose.connect(MONGO_URL, {useNewUrlParser: true},
    function (error) {
        if(error){
            console.error('Deu erro:' +error)
        }else{
            console.log('Conectamos no mongodb!! o/')
        }
    }
    );
}

module.exports = { connect }