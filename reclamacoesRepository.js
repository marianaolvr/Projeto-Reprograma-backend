const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://<marianaolvr>:<Olvrsaber13mlab>@ds133137.mlab.com:33137/heroku_77343qfl'

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