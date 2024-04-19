const Users = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
const multer = require('multer')
const fs = require('fs')
const express=require("express")
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb (null,"./public/usersImages")
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage})

module.exports = app => {
  app.post("/api/register",upload.single('image'), Users.register);
  
  app.post("/api/login", Users.login);
  
  app.post("/api/logout", Users.logout);
  
  app.get("/api/alluser", Users.alluser);
  
  app.get('/api/profil',Users.profil);
  
  app.patch('/api/enroll/:id',Users.enroll)

  
  app.get("/api/userlogedin" ,authenticate, (req, res) => {
    return res.json({ verified: true });
  });
  app.use('./public/usersImages', express.static('public/usersImages'))
  app.get('/public/usersImages/:imageName', (req, res) => {
    const imageName = req.params.imageName
    const readStream = fs.createReadStream(`./public/usersImages/${imageName}`)
    readStream.pipe(res)
  })

  
  
}