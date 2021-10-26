const express = require ("express");
const Authcontroller = require("../controllers/auth");

const api= express.Router();

api.post("/refresh-access-token",Authcontroller.refreshAceesstoken);

module.exports = api;