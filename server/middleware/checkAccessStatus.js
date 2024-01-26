const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const checkAccessStatus = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log("hiiii", authorization);
    // Extract access token from the authorization header
    const accessToken = authorization && authorization.split(' ')[1];

    // Validate and decode the access token
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Assuming your user schema has an 'isBlocked' field
    const user = await User.findOne({ email: decodedToken.email });

    if (user && user.isAccess) {
      // If the user is not blocked, proceed to the next middleware or route handler
      next();
    } else {
      // If the user is blocked, send a response with a 403 status and an error message
      res.status(403).json({ message: "You are blocked from accessing this resource." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = checkAccessStatus;
