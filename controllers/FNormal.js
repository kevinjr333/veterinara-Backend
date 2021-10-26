const FNormal = require("../models/FNormal");

function regFNormal(req,res) {
    //console.log("edpoint de reg fnormal"); // con esto siempre al empezar
    const fnormal = new FNormal();

    const {personal, paciente, peso, anamnesis, signos_clinicos, tc, fr, fc, mm, vacuna, conclusion, receta,fecha, dueno}=req.body  //re.body contiene lo que mandan
    fnormal.personal= personal;
    fnormal.paciente= paciente;
    fnormal.peso= peso;
    fnormal.anamnesis= anamnesis;
    fnormal.signos_clinicos= signos_clinicos;
    fnormal.tc= tc;
    fnormal.fr= fr;
    fnormal.fc= fc;
    fnormal.mm= mm;
    fnormal.vacuna= vacuna;
    fnormal.conclusion= conclusion;
    fnormal.receta= receta;
    fnormal.fecha= fecha;
    fnormal.dueno= dueno;

    fnormal.save((err, fichaStored) => {
        if(err){
            res.status(500).send({message: "Error del servidor"});
        }else{
            if(!fichaStored) {
                res.status(404).send({message: "Error al registrar la Ficha Medica"});
            } else{
                res.status(200).send({message: "La Ficha fue registrada exitosamente"});
            }
        }
    });
}

function getFormUs(req, res) {
    const query = req.query;

    FNormal.find({dueno: query.dueno,paciente: query.paciente}).sort({_id:"-1"}).then(fnormals => {
        if(!fnormals) {
            res.status(404).send({ message: "Nose ha ninguna ficha"});
        } else {
            res.status(200).send({fnormals}); //entrega los usuarios "users"
        }
    });
}

module.exports = {
    regFNormal,
    getFormUs
};
//FNormal.find().or([{dueno: query.dueno},{paciente: query.paciente}]).then(fnormalRes => {