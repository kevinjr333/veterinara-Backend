const fs = require("fs"); //obtener el avatar
const path = require ("path"); // subir

const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");
const { log } = require("console");
const { exists } = require("../models/user");
function signUp(req,res){
    const user = new User();
    const {usuario, nombre, apellidoP, apellidoM, correo, contrasena, repeContrasena, direccion, telefono} = req.body;
    
    user.usuario = usuario.toLowerCase();
    user.nombre = nombre;
    user.apellidoP = apellidoP;
    user.apellidoM = apellidoM;
    user.correo = correo.toLowerCase();
    user.direccion = direccion;
    user.telefono = telefono;
    user.rol = "cliente";
    user.sala= "no definido";
    user.activo = true;
    
    
    if(!contrasena || !repeContrasena) {
        res.status(404).send({message:"Las constraseñas son obligatorias"});
    } else {
        if(contrasena !== repeContrasena) {
            res.status(404).send({message:"Las constraseñas no son iguales"});
        } else {
            bcrypt.hash(contrasena, null, null, function(err,hash){
                if(err){
                    res.status(500).send({message: "Error al encriptar la contraseña"});
                } else {
                    user.contrasena = hash;

                    //guardando en mongodb
                    user.save((err, userStored) => {
                        if(err) {
                            res.status(500).send({message: "El usuario ya existe, intente con otro nombre de usuario"});
                        } else {
                            if(!userStored) {
                                res.status(404).send({message:"Error al crear el usuario"});
                            } else {
                                res.status(200).send({user: userStored});
                            }
                        }
                    })
                }
            })
        }
    }
}

function signIn(req,res){
    const params = req.body;
    const usuario = params.usuario.toLowerCase();
    const contrasena = params.contrasena;

    User.findOne({usuario}, (err, userStored) =>{
        if(err){
            res.status(500).send({message: "Error del servidor"});
        } else {
            if(!userStored) {
                res.status(404).send({message: "Usuario no registrado"});
            } else {
                bcrypt.compare(contrasena, userStored.contrasena, (err, check) => {
                    if(err){
                        res.status(500).send({message: "Error del servidor"});
                    }else if(!check){
                        res.status(404).send({message:"La contraseña es incorrecta"});
                    }else {
                        if(!userStored.activo) {
                            res.status(200).send({ code: 200, message: " El usuario no se encuentra activo"});
                        }else{
                            res.status(200).send({
                                accessToken: jwt.createAccessToken(userStored),
                                refreshToken: jwt.createRefreshToken(userStored)
                            });
                        }
                    }
                });
            }
        }
    });
}

function getUsers(req, res){
    User.find().then(users => {
        if(!users) {
            res.status(404).send({ message: "Nose ha encontrado ningun usuario"});
        } else {
            res.status(200).send({users}); //entrega los usuarios "users"
        }
        

    });
}

function getUsersActive(req, res){

    const query = req.query;

    User.find({activo: query.activo}).then(users => {
        if(!users) {
            res.status(404).send({ message: "Nose ha encontrado ningun usuario"});
        } else {
            res.status(200).send({users}); //entrega los usuarios "users"
        }
        

    });
}

function uploadAvatar(req, res){
    const params = req.params;
  
    User.findById({_id: params.id}, (err, userData) => {
        if(err){
            res.status(500).send({message:"Error del servidor"});
        }else{
            if(!userData){
                res.status(404).send({message:"Usuario no encontrado"});
            }else{
                let user = userData;

                if(req.files){
                    let filePath = req.files.avatar.path;
                    let fileSplit = filePath.split("\\");
                    let fileName = fileSplit[2];

                    let extSplit = fileName.split(".");
                    let fileExt = extSplit[1];
                    
                    if(fileExt !=="png" && fileExt != "jpg"){
                        res.status(400).send({message:"La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)"});

                    } else {
                        user.avatar = fileName;
                        User.findByIdAndUpdate({_id: params.id}, user, (err, userResult)=>{
                            if(err){
                                res.status(500).send({message:"Error del servidor"});
                            }else{
                                if(!userResult){
                                    res.status(404).send({message:"No se ha encontrado ningun usuario"});
                                }else {
                                    res.status(200).send({avatarName: fileName});
                                }
                            }
                        })
                    }
                }
            }
        }
    });
}

function getAvatar(req, res){ //para obtener la imagen
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/avatar/" + avatarName;
    
    fs.exists(filePath, exists =>{
        if(!exists){
            res.status(404).send({message: "El avatar que buscas no existe"});
        }else {
            res.sendFile(path.resolve(filePath));
        }
    });
}

async function updateUser(req, res){
    let userData = req.body;
    userData.usuario = req.body.usuario.toLowerCase();
    const params = req.params;

    if(userData.contrasena){
        await bcrypt.hash(userData.contrasena, null, null, (err, hash)=>{
            if(err){
                res.status(500).send({message:"Error al encriptar la contraseña"})
            } else {
                userData.contrasena = hash;
            }
        });
    };

    User.findByIdAndUpdate({_id: params.id }, userData,(err,userUpdate)=>{
        if(err){
            res.status(500).send({message:"Error del servidor"});
        }else{
            if(!userUpdate){
                res.status(404).send({message:"No se ha encontrado ningun usuario "});
            }else{
                res.status(200).send({message:"Usuario actualizado correctamente"});
            }
        }
    })
}

function activateUser(req,res){
    const {id}= req.params;
    const activo = false;
console.log(id, activo);
    User.findByIdAndUpdate(id, {activo}, (err, userStored) => {
        if(err) {
            res.status(500).send({message:"Error del servidor"});
        } else{
            if(!userStored){
                res.status(404).send({message:"No se ha encontrado el usuario"});
            }else{
                if(activo === true){
                    res.status(200).send({message:"Usuario Activado correctamente"});
                }else{
                    res.status(200).send({message:"Usuario Desactivado correctamente"});
                }
            }
        }
    })
}

function desactivateUser(req,res){
    const {id}= req.params;
    const activo = true;
console.log(id, activo);
    User.findByIdAndUpdate(id, {activo}, (err, userStored) => {
        if(err) {
            res.status(500).send({message:"Error del servidor"});
        } else{
            if(!userStored){
                res.status(404).send({message:"No se ha encontrado el usuario"});
            }else{
                if(activo === true){
                    res.status(200).send({message:"Usuario Activado correctamente"});
                }else{
                    res.status(200).send({message:"Usuario Desactivado correctamente"});
                }
            }
        }
    })
}

module.exports = {
    signUp,
    signIn,
    getUsers,
    getUsersActive,
    uploadAvatar,
    getAvatar,
    updateUser,
    activateUser,
    desactivateUser
};