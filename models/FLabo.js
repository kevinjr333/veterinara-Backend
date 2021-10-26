const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FichaLchema = Schema({
    personal: String,
    paciente: String,
    t_prueba: String,
    fecha: String,
    observaciones: String,
    glucosa: String,
    hemoglobina: String,
    proteinas: String,
    bilirrubina: String,
    urobilinogeno: String,
    cp_cetonicos: String,
    bacterias: String,
    hematies: String,
    dueno: String

});
module.exports = mongoose.model("FLabo", FichaLchema);