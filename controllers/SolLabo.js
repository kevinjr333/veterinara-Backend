const SolLabo = require("../models/SolLabo");

function RegSolLabo(req,res) {
   // console.log("edpoint de reserva"); // con esto siempre al empezar
    const solLabo = new SolLabo();

    const {personal, paciente, dueno, t_prueba, observaciones, fecha}=req.body
            solLabo.personal = personal;
            solLabo.paciente = paciente;
            solLabo.dueno = dueno;
            solLabo.t_prueba = t_prueba;
            solLabo.observaciones = observaciones;
            solLabo.fecha= fecha;
            solLabo.estado = false;
            
        solLabo.save((err, SolRaStored) => {
            if(err) {
                res.status(500).send({message: "Error del servidor"});
            } else {
                if(!SolRaStored) {
                    res.status(404).send({message:"Error al registrar la solicitud"});
                } else {
                    res.status(200).send({message:"La solicitud se registro correctamente"});
                }
            }
        })
}
function getSolLaboAll(req, res){
    SolLabo.find().sort({_id:"-1"}).then(solLabos => {
        if(!solLabos) {
            res.status(404).send({ message: "Nose ha encontrado ningun usuario"});
        } else {
            res.status(200).send({solLabos}); //entrega los usuarios "users"
        }
    });
}
module.exports = {
    RegSolLabo,
    getSolLaboAll
};
