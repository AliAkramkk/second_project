const express = require('express');
const user_router = express.Router();
const userController = require('../controller/userContrller')
// const checkAccess = require('../middleware/checkAccessStatus')


user_router.get('/profile/:id', userController.getStudent)
user_router.get('/my-learning', userController.myLernings)
user_router.get('/getCurrentCourse/:id', userController.getCurrentCourse)

user_router.patch('/editprofile', userController.editProfile)
user_router.post('/makePayment', userController.paymentHandle)


user_router.post('/addReview', userController.addReview)


module.exports = user_router;