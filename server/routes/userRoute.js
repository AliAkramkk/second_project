const express = require('express');
const user_router = express.Router();
const userController = require('../controller/userContrller')
// const checkAccess = require('../middleware/checkAccessStatus')


user_router.get('/profile/:id', userController.getStudent)
user_router.get('/my-learning', userController.myLernings)

user_router.patch('/editprofile', userController.editProfile)
user_router.post('/makePayment', userController.paymentHandle)
user_router.post('/sendmail', userController.sendLiveStreamLink);


module.exports = user_router;