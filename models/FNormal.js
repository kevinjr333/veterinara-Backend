const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FichaNchema = Schema({
    personal: String,
    paciente: String,
    dueno: String,
    peso: String,
    anamnesis: String,
    signos_clinicos: String,
    tc: String,
    fr: String,
    fc: String,
    mm: String,
    vacuna: String,
    conclusion: String,
    receta: String,
    fecha: String
});
module.exports = mongoose.model("FNormal", FichaNchema);