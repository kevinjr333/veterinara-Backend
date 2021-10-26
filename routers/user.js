const express = require ("express");
const UserController = require("../controllers/user");
const multipart = require ("connect-multiparty");

const md_auth = require ("../middleware/autthenticated");
const md_upload_avatar = multipart({uploadDir: "./uploads/avatar"});


const api= express.Router();

api.post("/sign-up", UserController.signUp);

///
api.post("/sign-in", UserController.signIn);
//
api.get("/users", [md_auth.ensureAuth], UserController.getUsers );// get xq obtenemos datos
//
api.get("/users-activo", [md_auth.ensureAuth], UserController.getUsersActive );

api.put("/upload-avatar/:id", [md_auth.ensureAuth, md_upload_avatar], UserController.uploadAvatar);

api.get("/get-avatar/:avatarName", UserController.getAvatar);

api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);

api.put("/activate-user/:id", [md_auth.ensureAuth],UserController.activateUser);
api.put("/desactivate-user/:id", [md_auth.ensureAuth],UserController.desactivateUser);

module.exports = api;