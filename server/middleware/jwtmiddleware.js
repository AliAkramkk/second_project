const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
require('dotenv').config(); // Import the dotenv package

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);
  if (!authHeader) {
    return res.sendStatus(403); // Forbidden if no token provided
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header
  console.log('Token:', token);
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token jwt:", decoded);
    req.user = decoded.email; // Assuming email is stored in the JWT payload

    // Additional verification if needed
    const userData = await User.findOne({ email: req.user, isAccess: true });
    console.log("Request User in jwt:", req.user);
    console.log("User Data in jwt:", userData);

    console.log(userData);
    if (!userData) {
      return res.sendStatus(403); // Forbidden if user not found or access is denied
    }

    next(); // Move to the next middleware or route handler
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    return res.sendStatus(403).json({ error: 'Forbidden: Invalid or expired token' }); // Forbidden if token is invalid or expired
  }
};

module.exports = verifyJWT;
