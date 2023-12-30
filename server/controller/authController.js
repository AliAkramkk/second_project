const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const public_controller = require('../controller/publicController')

const User = require('../models/userSchema');

const signUp_post = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, phone, isChef } = req.body;

    // Validate password strength (add your own criteria)
    if (password.length < 5) {
      return res.status(400).json({ error: 'Password must be at least 5 characters long.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: true, error: 'Email already exists.' });
    } else {
      const { otp, secret } = await public_controlls.genarateOTP();

      // Hash the password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        phone,
        OTP: secret,
        role: isChef ? 3000 : 2000,
      });
      await newUser.save();
      res.cookie("id", newUser._id, { maxAge: 500000, httpOnly: true });
      public_controlls.sendemailotp(email, otp);
      res.status(201).json({ message: "enter your otp" });
    }
    // Additional security measures (optional)
    // Implement email verification, set unique constraints in the database, etc.


  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ errors: true, error: 'Internal Server Error' });
  }
};


const signIn_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      console.log(1);
      if (password === user.password) {
        console.log(2);
        if (user.isVerify == true) {
          console.log(3);
          if (user.isAccess == true) {
            console.log(4);
            const accesstoken = jwt.sign(
              { email: user.email },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "1d" }
            );
            const refreshtoken = jwt.sign(
              { email: user.email },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: "2d" }
            );
            await User.updateOne(
              { _id: user._id },
              { $set: { JWT: refreshtoken } }
            );
            res.cookie("jwt", refreshtoken, {
              httpOnly: true,
              maxAge: 48 * 60 * 60 * 1000,
            });
            // console.log(req.cookies);
            res.status(201).json({
              message: "success",
              accesstoken,
              role: user.role,
              user: user.username,
              id: user._id
            });
          } else {

            res.status(400).json({ message: "You are Blocked 🙄" });
          }
        } else {
          res.status(400).json({ message: "You are not verifyed" });
        }
      } else {
        res.status(400).json({ message: "Wrong password" });
      }
    } else {
      res.status(400).json({ message: "User not exist...!" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const userVerifyOTP = async (req, res) => {
  try {
    const { OTP } = req.body;
    const id = req.cookies.id;
    // console.log(id)
    let user = await user_schema.findOne({ _id: id });
    const secret = user.OTP;
    const isValid = public_controlls.verifyOTP(secret, OTP);
    if (isValid == true) {
      // console.log(isValid);
      const role = user.role;

      await user_schema.updateOne({ _id: id }, { $set: { isVerify: true } });

      res.clearCookie("id");

      res.status(200).json({ message: role });
    } else {
      // console.log("not valid");
      res.status(400).json({ message: "OTP not valid." });
    }
  } catch (error) {
    console.log(error.message);
  }
};



module.exports = {
  signUp_post,
  signIn_post,
  userVerifyOTP,
};
