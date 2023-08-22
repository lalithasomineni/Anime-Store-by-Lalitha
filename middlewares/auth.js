const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

var auth = (req, res, next) => {
  if (req.headers['authorization'] == null) return res.status(401).json({ message: "Please login to browse" });

  var token = req.headers['authorization'].split(' ')[1];
  jwt.verify(token, process.env.private_key, (err, decodedToken) => {
    if (err) return res.status(403).json({ message: "Token expired or invalid" });
    req.user = decodedToken; // Attach the decoded token (including user ID) to the request
    next();
  });
}

module.exports = auth;

