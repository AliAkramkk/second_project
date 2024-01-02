const User = require('../models/userSchema');


const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: req.query.role });
    res.json({ students })
  } catch (error) {
    console.log(error.message);
  }
}

const updateAccessStatus = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    await User.updateOne(
      { email: email },
      { $set: { isAccess: !user.isAccess, JWT: "" } }
    );

    res.status(200).json({ message: "access changed success fully" });
  } catch (error) {
    console.log(error.message);
  }
};


module.exports = {
  getStudents,
  updateAccessStatus,
}