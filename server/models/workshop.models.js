const mongoose=require('mongoose')

const workshopSchema=new mongoose.Schema({
    titre:{
      type:String,
      required:[true,"{PATH} is reauired "],
    },
    description:{
        type:String,
    },
    datedeb:{
      type:String
    },
    datefin:{
      type:String
    },
    filename: {
      type: String,
    },
    cours:{
      type:[String],
    }
    
}, {timestamps: true});


const workshop=mongoose.model("workshop",workshopSchema)
  module.exports=workshop