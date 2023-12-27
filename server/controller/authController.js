const bcrypt = require('bcrypt');
const User = require('../models/userSchema');

const signUp_post = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

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
    });

    // Additional security measures (optional)
    // Implement email verification, set unique constraints in the database, etc.

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ errors: true, error: 'Internal Server Error' });
  }
};

module.exports = { signUp_post };
