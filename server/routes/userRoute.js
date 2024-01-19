const express = require('express');
const user_router = express.Router();
const userController = require('../controller/userContrller')

user_router.get('/profile/:id', userController.getStudent)

user_router.patch('/editprofile', userController.editProfile)
user_router.post('/makePayment', userController.paymentHandle)


module.exports = user_router;