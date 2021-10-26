const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY="sdSDdSDdD5d465D4d45D461d3D123d1";

exports.createAccessToken = function(user) {
    const payload = {
        id: user._id,
        usuario: user.usuario,
        nombre: user.nombre,
        apellidoP: user.apellidoP,
        apellidoM: user.apellidoM,
        correo: user.correo,
        direccion: user.direccion,
        telefono: user.telefono,
        rol: user.rol,
        sala: user.sala,
        createToken: moment().unix(),
        exp: moment().add(3, "hours").unix()
    };

    return jwt.encode(payload, SECRET_KEY);
};

exports.createRefreshToken = function(user) {
    const payload ={
        id: user._id,
        exp: moment().add(30, "days").unix()
    };
    return jwt.encode(payload,SECRET_KEY);
};

exports.decodedToken = function(token) {
    return jwt.decode(token, SECRET_KEY, true);
};