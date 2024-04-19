const jwt = require("jsonwebtoken");
module.exports.authenticata = (req, res, next) => {
  jwt.verify(req.cookies.admin, process.env.SECRET_KEY, (err, payload) => {
    if (err) { 
       res.json({verified: false});
    } else {
      next();
    }
  });
}