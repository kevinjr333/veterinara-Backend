const fs = require("fs");
const path = require("path");
const { exists } = require("../models/SolRadio");

const SolRadio = require("../models/SolRadio");


function RegSolRadio(req,res) {
   // console.log("edpoint de reserva"); // con esto siempre al empezar
    const solRadio = new SolRadio();

    const {personal, paciente, dueno, parte, parte_det, observaciones, fecha, estado}=req.body
        solRadio.personal = personal;
        solRadio.paciente = paciente;
        solRadio.dueno = dueno;
        solRadio.parte = parte;
        solRadio.observaciones = observaciones;
        solRadio.parte_det = parte_det;
        solRadio.fecha= fecha;
        solRadio.estado = false;
            
        solRadio.save((err, SolRaStored) => {
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
function getSolRadioAll(req, res){
    SolRadio.find().sort({_id:"-1"}).then(solRadios => {
        if(!solRadios) {
            res.status(404).send({ message: "Nose ha encontrado ningun usuario"});
        } else {
            res.status(200).send({solRadios}); //entrega los usuarios "users"
        }
    });
}
function uploadFoto(req,res){
    const params = req.params;

    SolRadio.findById({_id: params.id}, (err, radioData) =>{
        if(err){
            res.status(500).send({message:"Error del servidor"});
        }else{
            if(!radioData){
                res.status(404).send({message: " No se ha encontrado la solicitud"});
            } else{
                let radio = radioData;


                if(req.files){
                    let filePath = req.files.ft_radiog.path;
                    let fileSplit = filePath.split("\\");
                    let fileName = fileSplit[2];

                    let extSplit = fileName.split(".");
                    let fileExt = extSplit[1];
                    
                    if(fileExt !== "png" && fileExt !== "jpg"){
                        res.status(400).send({message:"La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)"});
                    } else{
                        radio.ft_radiog = fileName;
                        radio.estado = true;
                        SolRadio.findByIdAndUpdate({_id: params.id}, radio, (err, radioResult)=>{
                            if(err){
                                res.status(500).send({message:"Error del servidor"});
                            }else{
                                if(!radioResult){
                                    res.status(404).send({message:"No se ha encontrado la ficha"});
                                }else{
                                    res.status(200).send({message:"Registro correcto",radioName: fileName});
                                }
                            }
                        })
                    }                   
                }  

            }
        }
    });
}
function getFoto(req,res){
    const radioName = req.params.radioName;
    const filePath = "./uploads/radiografias/"+ radioName;

    fs.exists(filePath, exists=> {
        if(!exists){
            res.status(404).send({message:"La Radiografia que buscas no existe"});
        } else {
            res.sendFile(path.resolve(filePath));
        }
    });
}
function getSolAllUs(req, res) {
    const query = req.query;

    SolRadio.find({dueno: query.dueno,paciente: query.paciente,estado: true }).sort({_id:"-1"}).then(fRadios => {
        if(!fRadios) {
            res.status(404).send({ message: "Nose ha ninguna ficha"});
        } else {
            res.status(200).send({fRadios}); //entrega los usuarios "users"
        }
    });
}

module.exports = {
    RegSolRadio,
    getSolRadioAll,
    uploadFoto,
    getFoto,
    getSolAllUs
};