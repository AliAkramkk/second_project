const User = require('../models/userSchema');

const checkAccessStatus = async (req, res, next) => {
  try {
    const { email } = req.user; // Assuming the user information is stored in req.user during authentication
    console.log(email);
    const user = await User.findOne({ email });

    if (user && user.isAccess) {
      // If the user is not blocked, proceed to the next middleware or route handler
      next();
    } else {
      // If the user is blocked, send a response with an error message
      res.status(403).json({ message: "You are blocked from accessing this resource." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = checkAccessStatus;
