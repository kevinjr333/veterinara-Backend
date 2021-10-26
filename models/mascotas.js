const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MascotasSchema = Schema({
    nombre: String,
    usuDueno: String,
    especie: String,
    raza: String,
    sexo: String,
    color: String,
    anoNac: String,
    avatar: String
});


module.exports = mongoose.model("Mascot", MascotasSchema);