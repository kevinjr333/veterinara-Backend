const express = require("express");
const RegSolLaboController = require("../controllers/SolLabo");
const md_auth = require ("../middleware/autthenticated");

const api= express.Router();

api.post("/reg-sollabo",[md_auth.ensureAuth], RegSolLaboController.RegSolLabo);
api.get("/sol-labo", [md_auth.ensureAuth], RegSolLaboController.getSolLaboAll);
//api.get("/post-reserv", RegReservaController.postReserva);

module.exports = api;