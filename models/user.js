const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    usuario:{
        type: String,
        unique: true
    },
    nombre: String,
    apellidoP: String,
    apellidoM: String,
    correo: String,
    contrasena: String,
    direccion: String,
    telefono: String,
    rol: String,
    sala:String,
    activo: Boolean,
    avatar: String
});


module.exports = mongoose.model("User", UserSchema);