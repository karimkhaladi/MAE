const Admin = require('../controllers/admin.controller'); // Importing Admin controller
const workshop = require('../controllers/workshop.controller'); // Importing Workshop controller
const { authenticate } = require('../config/jwt.config'); // Importing authentication middleware
const { authenticata } = require('../config/jwt.config1'); // Importing authentication middleware

const multer = require('multer'); // Importing multer for file upload
const fs = require('fs'); // Importing file system module
const express = require("express"); // Importing Express framework

// Multer storage configuration for workshop images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./public/workshopimages"); // Set destination folder for uploaded images
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`); // Set filename for uploaded images
    }
});

const upload = multer({ storage }); // Initialize multer with storage configuration

module.exports = app => {
    // Admin login endpoint
    app.post("/api/admin/login", Admin.login);

    // Workshop creation endpoint with image upload
    app.post("/api/workshops", upload.single('photo'), workshop.createworkshop);

    // Endpoint to get all workshops
    app.get("/api/workshops", workshop.allworkshops);

    // Endpoint to get all users (authentication required)
    app.get("/api/allusers", authenticata, Admin.allusers);

    // Endpoint to delete a user
    app.delete("/api/delete/user/:id", Admin.delete);

    // Endpoint to delete a workshop
    app.delete("/api/delete/workshop/:id", workshop.deleteworkshop);

    // Endpoint to delete a course associated with a workshop
    app.delete("/api/delete/cour/:cour/:workshop", workshop.deletecour);

    // Endpoint to get all courses of a workshop
    app.get("/api/allcours/:id", workshop.allcours);

    // Serving static files (workshop images)
    app.use('./public/workshopimages', express.static('public/workshopimages'));

    // Endpoint to serve workshop images
    app.get('/public/workshopimages/:imageName', (req, res) => {
        const imageName = req.params.imageName;
        const readStream = fs.createReadStream(`./public/workshopimages/${imageName}`);
        readStream.pipe(res);
    });
};
