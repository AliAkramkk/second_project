const User = require('../models/userSchema')
const course_schema = require('../models/courseSchema')
const cloudinary = require('../config/cloudinary')

const getStudent = async (req, res) => {
  try {
    const id = req.params.id

    const student = await User.findOne({ _id: id });

    res.status(201).json({ student })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: true, error: 'Internal Server Error' });
  }
}

const editProfile = async (req, res) => {
  try {
    const { email, pic, username, phone } = req.body;
    let updatedUser;

    if (pic) {
      const data = await cloudinary.uploader.upload(pic, {
        folder: 'letsCoook'
      });

      updatedUser = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            pic: data.url || undefined, // Assuming 'url' is the property where Cloudinary stores the image URL
            username: data.username || undefined,
            phone: data.phone || undefined,
          },
        },
        { new: true } // Return the updated document
      );
    } else {
      updatedUser = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            username,
            phone,
          },
        },
        { new: true } // Return the updated document
      );
    }

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile edited', updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
// .............................User......................................... // 

module.exports = {
  getStudent,
  editProfile,

}