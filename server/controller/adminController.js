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

const getChefs = async (req, res) => {
  try {
    const chefs = await User.find({ role: req.query.role });
    res.status(201).json({ message: 'succesfully get all data', chefs })

  } catch (error) {

  }
}
const updateChefStatus = async (req, res) => {
  try {
    const { email } = req.body;
    const chef = await User.findOne({ email: email });
    await User.updateOne(
      { email: email },
      { $set: { isAccess: !chef.isAccess, JWT: "" } }
    );

    res.status(200).json({ message: "access changed success fully" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getStudents,
  updateAccessStatus,
  getChefs,
  updateChefStatus
}