const Mascot = require("../models/mascotas");

function registrarMascota(req,res) {
//  console.log("edpoint de reg mascotas"); // con esto siempre al empezar
    const mascot = new Mascot();

    const {nombre, usuDueno, especie, raza, sexo, color,anoNac, avatar}=req.body  //re.body contiene lo que mandan
    mascot.nombre= nombre.toLowerCase();
    mascot.usuDueno= usuDueno;
    mascot.especie= especie;
    mascot.raza = raza;
    mascot.sexo = sexo;
    mascot.color = color;
    mascot.anoNac = anoNac;
    mascot.avatar = avatar;

    mascot.save((err, userStored) => {
        if(err){
            res.status(500).send({message: "Error del servidor"});
        }else{
            if(!userStored) {
                res.status(404).send({message: "Error al registrar a su mascota"});
            } else{
                res.status(200).send({message: "Su mascota fue creada correctamente"});
            }
        }
    });
}

function getMascotsAll(req, res){
    Mascot.find().then(mascots => {
        if(!mascots) {
            res.status(404).send({ message: "Nose ha encontrado ningun usuario"});
        } else {
            res.status(200).send({mascots}); //entrega los usuarios "users"
        }
        

    });
}


function getMascots(req, res){

    const query = req.query;

    Mascot.find({usuDueno: query.usuDueno}).then(mascots => {
        if(!mascots) {
            res.status(404).send({ message: "Nose ha encontrado ningun usuario"});
        } else {
            res.status(200).send({mascots}); //entrega los usuarios "users"
        }
        

    });
}

function getAllMascotNom(req, res){
    const query = req.query;
    Mascot.find({nombre: query.nombre.toLowerCase()}).then(mascots => {
        if(!mascots) {
            res.status(404).send({ message: "No se ha encontrado ese paciente"});
        } else {
            res.status(200).send({mascots}); //entrega los usuarios "users"
        }

    });
}

module.exports = {
    registrarMascota,
    getMascots,
    getAllMascotNom,
    getMascotsAll
};
