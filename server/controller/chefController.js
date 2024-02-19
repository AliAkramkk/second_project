const user_schema = require('../models/userSchema');
const nodemailer = require('nodemailer');
const course_schema = require('../models/courseSchema');
const public_controller = require('./publicController');
const category_schema = require('../models/categorySchema');
const payment_schema = require('../models/paymentSchema')
// const public_controller = require('../controller/publicController')

const getStudent = async (req, res) => {
  try {
    const id = req.params.id
    // console.log("chef id", id);
    const student = await user_schema.findOne({ _id: id });

    res.status(201).json({ student })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: true, error: 'Internal Server Error' });
  }
}

// ................addCourse section....................................
const addCourse = async (req, res) => {
  try {
    const { title, category, description, price, aboutChef, blurb, user } = req.body;

    const chef = await user_schema.findOne({ _id: user });

    const uploadImageResult = await public_controller.uploadimage(req.files.coverImage);
    const uploadVideoResult = await public_controller.uploadVideo(req.files.demoVideo);

    const newCourse = new course_schema({
      title,
      category,
      description,
      coverImage: uploadImageResult,  // Set coverImage to the uploaded file result
      demoVideo: uploadVideoResult,
      price,
      blurb,
      aboutChef,
      chef: chef._id,
      chapters: [],
    });

    // Save the new course
    const savedCourse = await newCourse.save();
    // console.log("Add course", savedCourse);
    res.status(201).json({ message: "Course uploaded successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// // ...............edit course......................................
const editCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description, price, aboutChef, blurb, user } = req.body;

    const updatedCourseData = req.body;
    // console.log(updatedCourseData);

    // Check if new coverImage is provided
    if (req.files && req.files.coverImage) {
      const uploadImageResult = await public_controller.uploadimage(req.files.coverImage);
      updatedCourseData.coverImage = uploadImageResult;
      // console.log("image", uploadImageResult);
    }
    // Check if new demoVideo is provided
    if (req.files && req.files.demoVideo) {
      const uploadVideoResult = await public_controller.uploadVideo(req.files.demoVideo);
      updatedCourseData.demoVideo = uploadVideoResult;
    }

    // console.log("Updated Course Data:", updatedCourseData);

    const updatedCourse = await course_schema.findByIdAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );

    if (updatedCourse) {
      res.status(200).json({ message: "Course updated successfully", data: updatedCourse });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
// const editCourse = async (req, res) => {
//   try {
//     console.log("hii from edit course");
//     const { id } = req.params;
//     const updatedCourseData = req.body

//     console.log("hiii from editcourse", updatedCourseData);
//     const { title, category, description, price, aboutChef, blurb, user } = req.body;
//     // const uploadImageResult = await public_controller.uploadimage(req.files.coverImage);
//     // const uploadVideoResult = await public_controller.uploadVideo(req.files.demoVideo);
//     console.log("id", id);
//     // console.log("1", uploadImageResult);
//     const updatedCourse = await course_schema.findByIdAndUpdate(
//       { _id: id },
//       {
//         title: updatedCourseData.title,
//         category: updatedCourseData.category,
//         description: updatedCourseData.description,
//         price: updatedCourseData.price,
//         aboutChef: updatedCourseData.aboutChef,
//         blurb: updatedCourseData.blurb,
//         coverImage: updatedCourseData.coverImage, // Use existing cover image if upload fails
//         demoVideo: updatedCourseData.demoVideo, // Use existing demo video if upload fails
//       },
//       { new: true, runValidators: true }
//     );

//     console.log(updatedCourse);
//     if (updatedCourse) {
//       res.status(200).json({ message: "Course updated successfully", data: updatedCourse });
//     } else {
//       res.status(404).json({ message: "Course not found" });
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };



// const editCourse = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, category, description, price, aboutChef, blurb, user } = req.body;

//     const updatedCourseData = {
//       title,
//       category,
//       description,
//       price,
//       aboutChef,
//       blurb,
//     };



//     console.log("hii 1", updatedCourseData);
//     const updatedCourse = await course_schema.findByIdAndUpdate(
//       { _id: id },
//       updatedCourseData,
//       { new: true, runValidators: true }
//     );

//     if (updatedCourse) {
//       res.status(200).json({ message: "Course updated successfully", data: updatedCourse });
//     } else {
//       res.status(404).json({ message: "Course not found" });
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// ...........................get Categories.................................
const getCategories = async (req, res) => {
  try {
    console.log("hii from add course");
    const user = req.query;
    const chef = await user_schema.findOne({ username: user.user })
    if (chef) {
      const categoryNames = await course_schema.distinct('category');
      const categories = categoryNames.map(name => ({ name }));

      res.status(200).json({ categories });
    }


    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
}

// ......................get Course.......................
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
    const { id } = req.body;
    console.log("id" + id);
    const course = await course_schema.findOne({ _id: id })
    // console.log("coure", course);
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
    console.log("hiii");
    const id = req.params.id;
    // const paymentRecord = await payment_schema.findOne({ course_id: id });
    // console.log("paymentRecord", paymentRecord);
    // if (paymentRecord) {
    //   // If there are payment records, the course has been purchased
    //   return res.status(400).json({ message: "Cannot delete purchased course." });
    // }
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
    // console.log(id);
    // console.log(coverImage, demoVideo);

    const duplicate = await course_schema.findOne({
      chapters: { $elemMatch: { id: chapterNo } },
    });
    // console.log("duplicate", duplicate);
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
    const chef = await user_schema.findOne({ _id: user.id });
    const courses = await course_schema.find({ chef: chef._id, isShow: true });

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

const checkPayment = async (req, res) => {
  try {
    console.log('hiii');
    const courseId = req.params.id;
    const paymentRecord = await payment_schema.findOne({ course_id: courseId });
    console.log("paymentRecord", paymentRecord);

    if (paymentRecord) {
      // If there's a payment record, the course has been purchased
      return res.status(200).json({ purchased: true });
    }

    // If no payment record, the course has not been purchased
    return res.status(200).json({ purchased: false });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};



const sendLiveStreamLink = async (req, res) => {
  console.log("hiiii");
  const { liveStreamLink } = req.body;
  console.log("link", liveStreamLink);

  try {
    const students = await payment_schema.find().populate("user_id");

    console.log("students", students);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'akramkorakkottil@gmail.com',
        pass: 'zuvlydretngxazpl',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    for (const student of students) {
      console.log("Sending email to:", student.user_id ? student.user_id.email : 'N/A');


      const mailOptions = {
        from: 'akramkorakkottil@gmail.com',
        to: student.user_id.email,
        subject: 'Live Stream Link',
        html: `<p>Hello ${student.user_id.username},</p>
               <p>Here is the link to join the live stream: <a href="${liveStreamLink}">${liveStreamLink}</a></p>`,
      };

      const data = await transporter.sendMail(mailOptions);
      console.log(`Email has been sent to ${student.user_id.username} (${student.user_id.email})`, data.response);
    }

    res.status(200).json({ message: 'Emails sent successfully.' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
module.exports = {
  getStudent,
  addCourse,
  getCategories,
  getCourse,
  getVideoCourse,
  handleChangeCourse,
  deleteCourse,
  deleteChapter,
  addChapter,
  currentChefCourse,
  editCourse,
  checkPayment,
  sendLiveStreamLink
};
