const express = require('express');
const user_router = express.Router();
const userController = require('../controller/userContrller')

user_router.get('/profile/:id', userController.getStudent)

user_router.patch('/editprofile', userController.editProfile)


module.exports = user_router;