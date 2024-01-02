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
      const { otp, secret } = await public_controller.genarateOTP();

      // Hash the password using bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phone,
        OTP: secret,
        role: isChef ? 3000 : 2000,
      });
      await newUser.save();
      res.cookie("id", newUser._id, { maxAge: 500000, httpOnly: true });
      public_controller.sendemailotp(email, otp);
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
      console.log("user", user);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(isPasswordValid);
      if (isPasswordValid) {
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
            console.log(5)
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
    console.log(OTP);
    const id = req.cookies.id;
    console.log(req.cookies);
    console.log("ID:", id);

    // console.log(id)
    let user = await User.findOne({ _id: id });
    const secret = user.OTP;
    const isValid = public_controller.verifyOTP(secret, OTP);
    if (isValid == true) {
      // console.log(isValid);
      const role = user.role;

      await User.updateOne({ _id: id }, { $set: { isVerify: true } });

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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const newEmail = await User.findOne({ email });
  if (newEmail) {
    const { otp, secret } = await public_controller.genarateOTP();
    res.cookie("id", newEmail._id, { maxAge: 500000, httpOnly: true });
    newEmail.OTP = secret
    newEmail.save()
    public_controller.sendemailotp(email, otp);
    res.status(201).json({ message: "enter your otp" });
  } else {
    res.status(400).json({ message: 'email not exist' })
    console.log('no email');
  }
}

const forgotOtp = async (req, res) => {

  const { OTP } = req.body
  console.log("otp", OTP);
  const id = req.cookies.id;
  console.log("id", id);
  const userData = await User.findOne({ _id: id })
  console.log("userData", userData);
  const secret = userData.OTP;
  const isValid = public_controller.verifyOTP(secret, OTP);
  if (isValid) {
    res.cookie("id", userData._id, { maxAge: 500000, httpOnly: true });
    console.log("OTp match");
    res.status(201).json({ message: 'OTP success' })
  } else {
    console.log("otp fail");
    res.status(400).json({ message: "Wrong OTP" })
  }

}

const resetPassword = async (req, res) => {
  const { password } = req.body
  console.log("pass", password);

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const id = req.cookies.id;
  const userData = await User.findOne({ _id: id })

  if (userData) {
    userData.password = hashedPassword
    userData.save()
    res.status(201).json({ message: 'success the resetpassword' })
  }
  else {
    res.status(400).json({ message: 'faild the reset password' })
  }

}
module.exports = {
  signUp_post,
  signIn_post,
  userVerifyOTP,
  forgotPassword,
  forgotOtp,
  resetPassword
};
