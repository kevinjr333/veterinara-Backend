const Reserva = require("../models/reserva");

function regReserva(req,res) {
   // console.log("edpoint de reserva"); // con esto siempre al empezar
    const reserva = new Reserva();

    const {paciente, dueno, hora, fecha, sala }=req.body
        reserva.paciente= paciente;
        reserva.dueno = dueno;
        reserva.hora = hora;
        reserva.fecha = fecha;
        reserva.sala = sala;
        reserva.figual= `${fecha}T00:00:00.000Z`;
            
        reserva.save((err, reserStored) => {
            if(err) {
                res.status(500).send({message: "El usuario ya existe, intente con otro nombre de usuario"});
            } else {
                if(!reserStored) {
                    res.status(404).send({message:"Error al crear el usuario"});
                } else {
                    res.status(200).send({message:"La reserva de cita medica se registro correctamente"});
                }
            }
        })
}

function postReserva(req,res) {
    const query = req.query;
    const figual= `${query.fecha}T00:00:00.000Z`;

    Reserva.find({fecha: new Date(figual),hora: query.hora, sala: query.sala}).then(postReser => {
        if(!postReser) {
            res.status(404).send({ message: "Nose ha encontrado ningun usuario"});
        } else {
            res.status(200).send({postReser}); //entrega los usuarios "users"
        }
        

    });
}

function getReservPersonal(req,res) {
    const query = req.query;
    const figual= `${query.fecha}T00:00:00.000Z`;

    Reserva.find({fecha: new Date(figual),sala: query.sala}).sort({hora:"desc"}).then(citas => {
        if(!citas) {
            res.status(404).send({ message: "Nose ha encontrado ningun usuario"});
        } else {
            res.status(200).send({citas}); //entrega los usuarios "users"
        }
        

    });
}

module.exports = {
    regReserva,
    postReserva,
    getReservPersonal
};