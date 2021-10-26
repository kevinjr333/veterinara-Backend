const express = require("express");
const MascotasController = require("../controllers/mascotas");

const md_auth = require ("../middleware/autthenticated");


const api= express.Router();

api.post("/reg-masc",[md_auth.ensureAuth], MascotasController.registrarMascota);

api.get("/mascot",[md_auth.ensureAuth], MascotasController.getMascots);

api.get("/mascot-nom",[md_auth.ensureAuth],MascotasController.getAllMascotNom);

api.get("/mascot-all",[md_auth.ensureAuth],MascotasController.getMascotsAll);

module.exports = api;