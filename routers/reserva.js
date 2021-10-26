const express = require("express");
const RegReservaController = require("../controllers/reserva");
const md_auth = require ("../middleware/autthenticated");

const api= express.Router();

api.post("/reg-reserv", [md_auth.ensureAuth], RegReservaController.regReserva);
api.get("/post-reserv", RegReservaController.postReserva);
api.get("/reser-personal", RegReservaController.getReservPersonal)

module.exports = api;