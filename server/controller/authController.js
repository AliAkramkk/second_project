
const User = require('../models/userSchema')


const signUp_post = async (req, res) => {



  try {
    console.log(req.body);
    const { username, email, password, isAdmin, isAccess } = req.body
    const newUser = await User.create({
      username,
      email,
      password,
      isAdmin,
      isAccess
    })
    await newUser.save()
    res.status(201).json(newUser)
  } catch (err) {
    console.log(err);
    res.status(400).send('error,user not created')
  }
}





module.exports = { signUp_post }
