const FLabo = require("../models/FLabo");

function regFLabo(req,res) {
    //console.log("edpoint de reg flabo"); // con esto siempre al empezar
    const fLabo = new FLabo();

    const {personal, paciente, t_prueba,dueno, fecha, observaciones,glucosa,hemoglobina,proteinas,bilirrubina,urobilinogeno,cp_cetonicos,bacterias,hematies}=req.body  //re.body contiene lo que mandan
    fLabo.personal= personal;
    fLabo.paciente= paciente;
    fLabo.t_prueba= t_prueba;
    fLabo.fecha= fecha;
    fLabo.observaciones=observaciones; 
    fLabo.glucosa= glucosa;
    fLabo.hemoglobina= hemoglobina;
    fLabo.proteinas= proteinas;
    fLabo.bilirrubina= bilirrubina;
    fLabo.urobilinogeno= urobilinogeno;
    fLabo.cp_cetonicos= cp_cetonicos;
    fLabo.bacterias= bacterias;
    fLabo.hematies= hematies;
    fLabo.dueno= dueno;

    fLabo.save((err, fichaStored) => {
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

function getFormUsLab(req, res) {
    const query = req.query;

    FLabo.find({dueno: query.dueno,paciente: query.paciente}).sort({_id:"-1"}).then(fLaboRes => {
        if(!fLaboRes) {
            res.status(404).send({ message: "Nose ha ninguna ficha"});
        } else {
            res.status(200).send({fLaboRes}); //entrega los usuarios "users"
        }
    });
}
module.exports = {
    regFLabo,
    getFormUsLab
};
