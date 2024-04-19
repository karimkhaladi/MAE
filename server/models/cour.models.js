const mongoose=require('mongoose')

const cour=new mongoose.Schema({
    titre:{
      type:String,
      required:[true,"{PATH} is reauired "],
    },
    description:{
        type:String,
    },
    filename: {
      type: String,
    },
    
}, {timestamps: true});


const Cour=mongoose.model("cour",cour)
  module.exports=Cour