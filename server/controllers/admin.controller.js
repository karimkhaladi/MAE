const User = require("../models/user.models");
const jwt = require("jsonwebtoken");

module.exports = {
    // Controller to fetch all users
    allusers: async (req, res) => {
        User.find()
            .then(allusers => res.json(allusers))
            .catch(err => res.json(err));
    },

    // Controller for user login
    login: async (req, res) => {
        // Check if the provided credentials match the admin credentials from environment variables
        if (req.body.email == process.env.admin && req.body.password == process.env.password) {
            // If credentials are correct, generate a JWT token for the admin
            const adminToken = jwt.sign({ id: "admin" }, process.env.SECRET_KEY);
            
            // Set the admin token as a cookie and send the admin ID in the response
            res.cookie("admin", adminToken, { httpOnly: true }).json({ id: "admin" });
        } else {
            // If credentials are incorrect, return an error response
            res.status(400).json("error");
        }
    },

    // Controller to delete a user by ID
    delete: async (req, res) => {
        // Find and delete the user based on the provided ID
        User.deleteOne({ _id: req.params.id })
            .then(deletedUser => {
                res.json(deletedUser);
            })
            .catch(err => res.json(err));
    },
};
