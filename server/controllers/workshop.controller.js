const Cour = require("../models/cour.models");
const Workshop = require('../models/workshop.models')
module.exports ={
    allworkshops: async(req,res)=>{
        Workshop.find()
        .then(allworkshops=>res.json(allworkshops))
        .catch((err)=>res.json(err))
    },
    oneworkshop: async(req,res)=>{
        Workshop.findOne({_id:req.params.id})
        .then(oneworkshop=>res.json(oneworkshop))
        .catch((err)=>res.json(err))
    },
    allcours:async(req,res)=>{
        try{
            const workshop = await Workshop.findOne({_id: req.params.id})
            const cours=[]
            for (let i = 0; i < workshop.cours.length; i++){
              const cour=await Cour.findOne({_id:workshop.cours[i]})
              cours.push(cour)
            }
            res.status(200).json({workshop,cours})
          }
          catch(error){
            res.status(400).json(error)
          }
    },
    onecours:async(req,res)=>{
        Cour.findOne({_id:req.params.id})
        .then(onecour=>res.json(onecour))
        .catch((err)=>res.json(err))
    },
    createworkshop:async(req,res)=>{
        const {titre,description,datedeb,datefin}=req.body
        const filename=req.file.filename
        const workshop={titre,description,datedeb,datefin,filename}
        Workshop.create(workshop)
        .then(workshop=>{
            res.json({ msg: "success!", workshop: workshop });
        }
        )
        .catch(err => res.json(err));
    },
    createcour:async(req,res)=>{
        const {titre,description}=req.body
        const filename=req.file.filename
        const cour={titre,description,filename}
        createcour =await Cour.create(cour)
        const id=createcour._id.toString()
        Workshop.findOneAndUpdate({_id:req.params.id}, { $push: { cours: id }},{new:true})
        .then(cour=>{
            console.log(createcour)
        })
        
    },
    deleteworkshop:async (req,res)=>{
        Workshop.deleteOne({_id:req.params.id})
        
        .then(deletedWorkshop=>res.json(deletedWorkshop))
        .catch((err)=>res.json(err))
    },

    deletecour:async(req,res)=>{
        Cour.deleteOne({_id:req.params.cour})
        Workshop.findOneAndUpdate({_id:req.params.workshop}, { $pull: { cours: req.params.cour }},{new:true})
        .then(deletedcour=>{res.json(deletedcour)})
        .catch((err)=>res.json(err))
    },
    
}