const mongoose = require('mongoose');
const app = require ('./app');
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB } = require('./config');

//mongoose.set("userFindAndModify", false);

mongoose.connect(`mongodb+srv://admin:mern1234@veterinaria.xxip0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
{useNewUrlParser: true, useUnifiedTopology: true },(err,res) => {
    if(err){
        throw err;
        
    }else{
        console.log("CONEXION CORRECTA");


        app.listen(port,() => {
            console.log("###################");
            console.log("#### API REST #####");
            console.log("###################");
            console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}`);
        })
    }
});