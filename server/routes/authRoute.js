const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')




router.post('/signup', authController.signUp_post)
router.post('/signin', authController.signIn_post)

module.exports = router