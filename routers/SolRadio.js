const express = require("express");
const RegSolRadioController = require("../controllers/SolRadio");
const multipart = require("connect-multiparty");

const md_auth = require ("../middleware/autthenticated");
const md_uploadFoto = multipart({uploadDir:"./uploads/radiografias"});


const api= express.Router();

api.post("/reg-solradio",[md_auth.ensureAuth], RegSolRadioController.RegSolRadio);
api.get("/sol-radio",[md_auth.ensureAuth],RegSolRadioController.getSolRadioAll);
api.put("/upload-foto/:id", [md_auth.ensureAuth, md_uploadFoto],RegSolRadioController.uploadFoto);
api.get("/get-foto/:radioName", RegSolRadioController.getFoto);
api.get("/frad-usu", [md_auth.ensureAuth],RegSolRadioController.getSolAllUs);
module.exports = api;