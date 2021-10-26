const express = require("express");
const FLaboController = require("../controllers/FLabo");
const md_auth = require ("../middleware/autthenticated");


const api= express.Router();

api.post("/reg-labo",[md_auth.ensureAuth], FLaboController.regFLabo);
api.get("/flab-usu",[md_auth.ensureAuth],FLaboController.getFormUsLab);

module.exports = api;