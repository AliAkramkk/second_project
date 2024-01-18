const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
require('dotenv').config(); // Import the dotenv package

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  if (!authHeader) {
    return res.sendStatus(403); // Forbidden if no token provided
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded.email; // Assuming email is stored in the JWT payload

    // Additional verification if needed
    const userData = await User.findOne({ email: req.user, isAccess: true });
    console.log("Request User:", req.user);
    console.log("User Data:", userData);

    console.log(userData);
    if (!userData) {
      return res.sendStatus(403); // Forbidden if user not found or access is denied
    }

    next(); // Move to the next middleware or route handler
  } catch (err) {
    return res.sendStatus(403); // Forbidden if token is invalid or expired
  }
};

module.exports = verifyJWT;
