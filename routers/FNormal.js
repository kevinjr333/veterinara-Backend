const express = require("express");
const FNormalController = require("../controllers/FNormal");
const md_auth = require ("../middleware/autthenticated");


const api= express.Router();

api.post("/reg-fnorm",[md_auth.ensureAuth], FNormalController.regFNormal);
api.get("/fnormal-usu",[md_auth.ensureAuth],FNormalController.getFormUs);

module.exports = api;