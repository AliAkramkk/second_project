const User = require('../models/userSchema')
const course_schema = require('../models/courseSchema')
const cloudinary = require('../config/cloudinary')
const public_controller = require('../controller/publicController')
const payment_schema = require('../models/paymentSchema')
const stripe = require('stripe')("sk_test_51OZw6sSGxmt4Us6ahn1zKNrTKCU2i4g1nywFMKhlL44a7eep7CLjSy91PbTGw1cCkDYkqjVc2UtMFUwcIHKSJneS00kcIDEzfR")
const jwt = require('jsonwebtoken')

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

const paymentHandle = async (req, res) => {
  try {

    const { user, courseData } = req.body;
    const course = await course_schema.findOne({ _id: courseData._id })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
              images: [course.coverImage.url],
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/successpayment?session_id={CHECKOUT_SESSION_ID}&course_id=${courseData._id}&user_name=${user.user}`,
      cancel_url: "http://localhost:5173/allcourses",
    });
    res.status(200).json({ id: session.id });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


const handleSuccessPayment = async (req, res) => {
  try {
    const { session_id, user_name, course_id } = req.query;
    console.log(req.query)
    const userdata = await User.findOne({ username: user_name });
    const course = await course_schema.findOne({ _id: course_id });
    await course_schema.findByIdAndUpdate(course_id, {
      $addToSet: { users: userdata._id },
    });

    const payment = new payment_schema({
      strip_id: session_id,
      course_id: course._id,
      chef_id: course.chef,
      amount: course.price,
      user_id: userdata._id,
    });

    await payment.save();
    res.redirect('http://localhost:5173/user/mylearnigs');

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  getStudent,
  editProfile,
  paymentHandle,
  handleSuccessPayment

}