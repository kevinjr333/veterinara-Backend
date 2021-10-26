const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservaSchema = Schema({
    paciente: String,
    dueno: String,
    hora: String,
    fecha: Date,
    sala: String
});


module.exports = mongoose.model("Reservas", ReservaSchema);