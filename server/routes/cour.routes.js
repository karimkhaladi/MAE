const workshop = require('../controllers/workshop.controller'); // Importing Workshop controller
const multer = require('multer'); // Importing multer for file upload
const fs = require('fs'); // Importing file system module
const express = require("express"); // Importing Express framework

// Multer storage configuration for PDF files
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, "./pdf"); // Set destination folder for uploaded PDF files
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`); // Set filename for uploaded PDF files
    }
});

const upload = multer({ storage }); // Initialize multer with storage configuration

module.exports = app => {
    // Endpoint to add a new course with PDF upload
    app.post("/api/addcour/:id", upload.single('pdf'), workshop.createcour);

    // Endpoint to get details of a single course by ID
    app.get("/api/cour/:id", workshop.onecours);

    // Serving static files (PDF files)
    app.use('./pdf', express.static('pdf'));

    // Endpoint to serve PDF files
    app.get('/pdf/:pdf', (req, res) => {
        const pdf = req.params.pdf;
        const readStream = fs.createReadStream(`./pdf/${pdf}`);
        readStream.pipe(res);
    });
};
