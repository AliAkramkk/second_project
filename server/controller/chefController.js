const user_schema = require('../models/userSchema');
const course_schema = require('../models/courseSchema');
const public_controller = require('./publicController');



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

const addCourse = async (req, res) => {
  try {
    const { title, category, description, price, aboutChef, blurb, user } = req.body;


    // console.log(req.files);


    // console.log(user)
    // Assuming userdata is the chef data, but make sure it's defined
    const chef = await user_schema.findOne({ _id: user });
    // console.log(chef);
    // Upload the coverImage to Cloudinary
    const uploadImageResult = await public_controller.uploadimage(
      req.files.coverImage
    );
    const uploadVideoResult = await public_controller.uploadVideo(
      req.files.demoVideo
    );

    const newCourse = new course_schema({
      title,
      category,
      description,
      coverImage: uploadImageResult,
      demoVideo: uploadVideoResult,
      price,
      blurb,
      aboutChef,
      chef: chef._id,
      chapters: [],
    });

    // Save the new course
    const savedCourse = await newCourse.save();

    return res.status(201).json({ message: "Course uploaded successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getCourse = async (req, res) => {
  try {
    const id = req.params.id
    console.log("id", id);
    const chef = await course_schema.findOne({ chef: id })
    console.log("chef", chef);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getStudent,
  addCourse,
  getCourse
};
