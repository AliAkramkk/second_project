const user_schema = require('../models/userSchema');
const course_schema = require('../models/courseSchema');
const public_controller = require('./publicController');


const getStudent = async (req, res) => {
  try {
    const id = req.params.id
    console.log("chef id", id);
    const student = await user_schema.findOne({ _id: id });

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

    const chef = await user_schema.findOne({ _id: user });
    // console.log(chef);

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

    res.status(201).json({ message: "Course uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getCourse = async (req, res) => {
  try {
    const user = req.query.user;

    const chef = await user_schema.findOne({ username: user.user })

    const courses = await course_schema.find({ chef: chef._id });
    if (courses) {
      res.status(200).json({ courses });
    } else {
      res.status(400).json({ message: "Courses is empty 😥" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" })
  }
}

const getVideoCourse = async (req, res) => {
  try {


    const course_id = req.params.course_id
    const course = await course_schema.findOne({ _id: course_id })

    if (course) {
      res.status(200).json({ course })
    } else {
      res.status(400).json({ message: "No course is there" })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" })
  }
};
const handleChangeCourse = async (req, res) => {
  try {
    const { id } = req.body
    const course = await course_schema.findOne({ _id: id })
    await course_schema.updateOne(
      { _id: course._id },
      { $set: { isShow: !course.isShow } }
    );
    res.status(200).json({ message: "show succefully changed" })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" })
  }
}

const deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await course_schema.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Course deleted succefully" })
    } else {
      res.status(404).json({ message: "There is no Course" })
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" })
  }
}

const deleteChapter = async (req, res) => {
  try {
    const { id, index } = req.body;
    const course = await course_schema.findOne({ _id: id })

    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }
    const result = await course_schema.findOneAndUpdate({ _id: id },
      { $pull: { chapters: { id: index }, }, }, { new: true });

    if (result) {
      res.status(200).json({ message: "Chapter deleted successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" })
  }
}

const addChapter = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { chapterNo, title, description } = req.body;
    const { id } = req.body;
    const { coverImage, demoVideo } = req.files;
    console.log(id);
    // console.log(coverImage, demoVideo);

    const duplicate = await course_schema.findOne({
      chapters: { $elemMatch: { id: chapterNo } },
    });
    console.log("duplicate", duplicate);
    if (duplicate) {
      res.status(422).json({ message: "Chapter already exists!" });
    } else {
      const uploadVideoResult = await public_controller.uploadVideo(
        demoVideo
      );
      const uploadImageResult = await public_controller.uploadimage(
        coverImage
      );

      const newChapter = {
        id: chapterNo,
        title,
        description,
        coverImage: uploadImageResult,
        demoVideo: uploadVideoResult,
      };

      const savedChapter = await course_schema.updateOne(
        { _id: id },
        { $push: { chapters: newChapter } }
      );
      console.log("newChapter", savedChapter);
      res.status(201).json({ message: "Chapter uploaded successfully!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const currentChefCourse = async (req, res) => {
  try {
    const user = req.query;
    console.log("user1", user);
    const chef = await user_schema.findOne({ _id: user.id });
    console.log("chef",);
    const courses = await course_schema.find({ chef: chef._id, isShow: true });

    console.log(courses.length);
    if (courses) {
      res.status(200).json({ courses });
    } else {
      res.status(400).json({ message: "Courses is empty 😥" });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" })
  }

}

module.exports = {
  getStudent,
  addCourse,
  getCourse,
  getVideoCourse,
  handleChangeCourse,
  deleteCourse,
  deleteChapter,
  addChapter,
  currentChefCourse
};
