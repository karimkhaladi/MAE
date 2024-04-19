const User = require("../models/user.models")
const jwt = require("jsonwebtoken");
module.exports ={
    allusers: async(req,res)=>{
        User.find()
        .then(allusers=>res.json(allusers))
        .catch((err)=>res.json(err))
    },
    login:async(req,res)=>{
        if (req.body.email==process.env.admin && req.body.password==process.env.password){
            const admin = jwt.sign({
                id: "admin"
            }, process.env.SECRET_KEY);
         
            // note that the response object allows chained calls to cookie and json
            res
                .cookie("admin", admin, {
                    httpOnly: true
                })
                .json({ id : "admin" });
        }
        else{
            res.status(400).json("error")
        }
    },
    delete:async(req,res)=>{
        User.deleteOne({_id:req.params.id})
        .then(deleteduser=>{
            res.json(deleteduser)})
        .catch((err)=>res.json(err))
    },
}