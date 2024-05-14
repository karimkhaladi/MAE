const Users = require('../controllers/user.controller'); // Importing User controller
const { authenticate } = require('../config/jwt.config'); // Importing authentication middleware
const multer = require('multer'); // Importing multer for file upload
const fs = require('fs'); // Importing file system module
const express = require("express"); // Importing Express framework

// Multer storage configuration for user images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./public/usersImages"); // Set destination folder for uploaded user images
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`); // Set filename for uploaded user images
    }
});

const upload = multer({ storage }); // Initialize multer with storage configuration

module.exports = app => {
    // Endpoint to register a new user with image upload
    app.post("/api/register", upload.single('image'), Users.register);

    // Endpoint to log in a user
    app.post("/api/login", Users.login);

    // Endpoint to log out a user
    app.post("/api/logout", Users.logout);

    // Endpoint to get all users
    app.get("/api/alluser", Users.alluser);

    // Endpoint to get profile of the logged-in user
    app.get('/api/profil', Users.profil);

    // Endpoint to enroll a user in a course
    app.patch('/api/enroll/:id', Users.enroll);

    // Endpoint to check if a user is logged in (authentication required)
    app.get("/api/userlogedin", authenticate, (req, res) => {
        return res.json({ verified: true });
    });

    // Serving static files (user images)
    app.use('./public/usersImages', express.static('public/usersImages'));

    // Endpoint to serve user images
    app.get('/public/usersImages/:imageName', (req, res) => {
        const imageName = req.params.imageName;
        const readStream = fs.createReadStream(`./public/usersImages/${imageName}`);
        readStream.pipe(res);
    });
};
