
const Admin = require('../controllers/admin.controller');
const workshop=require('../controllers/workshop.controller')
const { authenticate } = require('../config/jwt.config');
const { authenticata } = require('../config/jwt.config1');

const multer = require('multer')
const fs = require('fs')
const express=require("express")
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb (null,"./public/workshopimages")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage})


module.exports = app => {
    app.post("/api/admin/login",Admin.login);   
    app.post("/api/workshops",upload.single('photo'),workshop.createworkshop)       

    app.get("/api/workshops", workshop.allworkshops);
    
    app.get("/api/allusers",authenticata,Admin.allusers);
    app.delete("/api/delete/user/:id",Admin.delete)
    app.delete("/api/delete/workshop/:id",workshop.deleteworkshop)
    app.delete("/api/delete/cour/:cour/:workshop",workshop.deletecour)
    
    app.get("/api/allcours/:id",workshop.allcours)
    app.use('./public/workshopimages', express.static('public/workshopimages'))
    app.get('/public/workshopimages/:imageName', (req, res) => {
        const imageName = req.params.imageName
        const readStream = fs.createReadStream(`./public/workshopimages/${imageName}`)
        readStream.pipe(res)
  })
  }