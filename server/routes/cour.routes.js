const workshop=require('../controllers/workshop.controller')
const multer = require('multer')
const fs = require('fs')
const express=require("express")
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb (null,"./pdf")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage})


module.exports = app => {
    app.post("/api/addcour/:id",upload.single('pdf'),workshop.createcour); 
    app.get("/api/cour/:id",workshop.onecours)
    
    app.use('./pdf', express.static('pdf'))
    app.get('/pdf/:pdf', (req, res) => {
        const pdf = req.params.pdf
        const readStream = fs.createReadStream(`./pdf/${pdf}`)
        readStream.pipe(res)
  })
  }