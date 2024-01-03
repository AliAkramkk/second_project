const User = require('../models/userSchema')

const getStudents = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id);
    const student = await User.findOne({ _id: id });
    console.log(student)
    res.json({ student })
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = {
  getStudents
}