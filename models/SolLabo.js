const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SolLabochema = Schema({
    personal: String,
    paciente: String,
    dueno: String,
    t_prueba: String,
    observaciones: String,
    fecha: String,
    estado: Boolean
});
module.exports = mongoose.model("SolLabo", SolLabochema);