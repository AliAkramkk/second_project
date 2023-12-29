const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema');

const signUp_post = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, phone } = req.body;

    // Validate password strength (add your own criteria)
    if (password.length < 5) {
      return res.status(400).json({ error: 'Password must be at least 5 characters long.' });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: true, error: 'Email already exists.' });
    }

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
    });

    // Additional security measures (optional)
    // Implement email verification, set unique constraints in the database, etc.

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ errors: true, error: 'Internal Server Error' });
  }
};


const signIn_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
      const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2d' });

      await User.updateOne({ _id: user._id }, { $set: { JWT: refreshToken } });

      res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 48 * 60 * 60 * 1000 });

      res.status(200).json({
        success: true,
        accessToken,
        role: user.role,
        email: user.email,
        userId: user._id,
      });
    } else {
      res.status(401).json({ errors: true, error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ errors: true, error: 'Internal Server Error' });
  }
};

module.exports = { signUp_post, signIn_post };
