const jwt = require("jsonwebtoken");
const User = require("../models/user.models")
const bcrypt = require('bcrypt');
const Workshop = require('../models/workshop.models')
const { Resend } = require('resend');

// Initialize Resend client with your API key
const resend = new Resend('re_cHmu9Pnu_AKhKX1grJSKwdGCQxmHUYY2U');

module.exports = {
    register: async (req, res) => {
        try {
            // Check if a user with the provided email already exists
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ errors: "Email already exists, please login" });
            }

            // Destructure the request body
            const { email, password, confirmPassword, name, phonenumber, state } = req.body;
            const filename = req.file ? req.file.filename : null;

            // Create a new user object
            const newUser = {
                email,
                password,
                confirmPassword,
                name,
                phonenumber,
                state,
                filename,
            };

            // Create a new user in the database
            const user = await User.create(newUser);

            // Send a welcome email using Resend
            const { data, error } = await resend.emails.send({
                from: 'MAE <onboarding@resend.dev>',
                to: email, // Send the email to the user's email address
                subject: 'Welcome to Our Service',
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome to Our Service!</title>
                    <style>
                        /* Styling for the email content */
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 20px auto;
                            padding: 20px;
                            background-color: #fff;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h1 {
                            color: #007bff;
                            text-align: center;
                        }
                        p {
                            margin: 10px 0;
                            line-height: 1.6;
                            color: #333;
                        }
                        .welcome-message {
                            font-size: 18px;
                            margin-bottom: 20px;
                        }
                        .button {
                            display: inline-block;
                            margin-top: 20px;
                            padding: 10px 20px;
                            color: #fff;
                            background-color: #007bff;
                            border-radius: 5px;
                            text-align: center;
                            text-decoration: none;
                        }
                        .footer {
                            margin-top: 30px;
                            text-align: center;
                            color: #888;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Welcome to Our Service!</h1>
                        <p class="welcome-message">Hello <strong>${name}</strong>,</p>
                        <p class="welcome-message">Thank you for joining our platform! Your registration was successful, and we are thrilled to have you on board.</p>
                        <p class="welcome-message">Get started by exploring your account settings and checking out our latest updates.</p>
                        <a href="http://localhost:5173/" class="button">Get Started</a>
                        <p class="footer">If you need assistance, feel free to reach out to our support team.</p>
                        <p class="footer">Best regards,</p>
                        <p class="footer">Your Service Team</p>
                    </div>
                </body>
                </html>
            `,
            
            });

            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent successfully:', data);
            }

            // Respond with a success message and the newly created user
            res.json({ msg: "Success!", user });

        } catch (err) {
            // Handle any errors that occurred during the process
            console.error('Error during registration:', err);
            res.status(500).json({ error: 'Internal Server Error', details: err });
        }
    },


    
      login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
     
        if(user === null) {
            // email not found in users collection
            return res.sendStatus(400);
        }
     
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
     
        if(!correctPassword) {
            // password wasn't a match!
            return res.sendStatus(400);
        }
     
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
     
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ id :user._id });
    },

    logout: async(req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },
    
    alluser: async(req,res)=>{
        User.find()
        .then(allthings=>res.json(allthings))
        .catch((err)=>res.json(err))
    },

    profil: async (req,res )=>{
        jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, async(err, payload) => {
            if (err) { 
               res.status(501).json({verified: "ss"});
            } else {
                
                const user= await User.findById(payload.id);
                const workshops=[]
                
                    for (let i = 0; i < user.workshops.length; i++){
                        const workshop= await Workshop.findOne({_id:user.workshops[i]})
                        workshops.push(workshop)
                    }
                
                res.json({user,workshops});
            }
          });
    },

    enroll: async(req,res)=>{
        const {workshopp}=req.body
        const {id}=req.params.id
        console.log(id)
        User.findOneAndUpdate({_id:req.params.id}, { $push: { workshops : workshopp }},{new:true})
        .then(updatedworkshop=>res.json(updatedworkshop))
        .catch((err)=>res.json(err))
    },
} 