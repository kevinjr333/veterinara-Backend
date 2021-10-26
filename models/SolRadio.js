const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SolRadiochema = Schema({
    personal: String,
    paciente: String,
    dueno: String,
    parte: String,
    parte_det: String,
    observaciones: String,
    fecha: String,
    ft_radiog: String,
    estado: Boolean
});
module.exports = mongoose.model("SolRadio", SolRadiochema);