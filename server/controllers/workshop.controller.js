const Cour = require("../models/cour.models"); // Importing the Cour model
const Workshop = require('../models/workshop.models'); // Importing the Workshop model
const User = require('../models/user.models');
module.exports = {
    // Endpoint to get all workshops
    allworkshops: async (req, res) => {
        Workshop.find()
            .then(allworkshops => res.json(allworkshops))
            .catch((err) => res.json(err));
    },
    // Endpoint to get one workshop by ID
    oneworkshop: async (req, res) => {
        Workshop.findOne({ _id: req.params.id })
            .then(oneworkshop => res.json(oneworkshop))
            .catch((err) => res.json(err));
    },
    // Endpoint to get all courses of a workshop
    allcours: async (req, res) => {
        try {
            const workshop = await Workshop.findOne({ _id: req.params.id });
            const cours = [];
            // Loop through each course ID in the workshop
            for (let i = 0; i < workshop.cours.length; i++) {
                const cour = await Cour.findOne({ _id: workshop.cours[i] });
                cours.push(cour);
            }
            // Respond with workshop and its courses
            res.status(200).json({ workshop, cours });
        } catch (error) {
            // If error occurs, send error response
            res.status(400).json(error);
        }
    },
    // Endpoint to get one course by ID
    onecours: async (req, res) => {
        Cour.findOne({ _id: req.params.id })
            .then(onecour => res.json(onecour))
            .catch((err) => res.json(err));
    },
    // Endpoint to create a new workshop
    createworkshop: async (req, res) => {
        const { titre, description, datedeb, datefin } = req.body;
        const filename = req.file.filename;
        const workshop = { titre, description, datedeb, datefin, filename };
        // Create the workshop
        Workshop.create(workshop)
            .then(workshop => {
                // Respond with success message and created workshop
                res.json({ msg: "success!", workshop: workshop });
            })
            .catch(err => res.json(err));
    },
    // Endpoint to create a new course and associate it with a workshop
    createcour: async (req, res) => {
        const { titre, description } = req.body;
        const filename = req.file.filename;
        const cour = { titre, description, filename };
        // Create the course
        const createcour = await Cour.create(cour);
        const id = createcour._id.toString();
        // Add the course ID to the workshop's courses array
        Workshop.findOneAndUpdate({ _id: req.params.id }, { $push: { cours: id } }, { new: true })
            .then(cour => {
                console.log(createcour);
            });

    },
    // Endpoint to delete a workshop by ID
    deleteworkshop: async (req, res) => {
        try {
            // First, delete the workshop
            const deletedWorkshop = await Workshop.deleteOne({ _id: req.params.id });

         

            // Then, update all users who have this workshop in their workshops array
            await User.updateMany(
                { workshops: req.params.id },
                { $pull: { workshops: req.params.id } }
            );

            // Respond with the deleted workshop information
            res.json(deletedWorkshop);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // Endpoint to delete a course by ID and remove it from the associated workshop
    deletecour: async (req, res) => {
        Cour.deleteOne({ _id: req.params.cour });
        Workshop.findOneAndUpdate({ _id: req.params.workshop }, { $pull: { cours: req.params.cour } }, { new: true })
            .then(deletedcour => {
                res.json(deletedcour);
            })
            .catch((err) => res.json(err));
    },
};
