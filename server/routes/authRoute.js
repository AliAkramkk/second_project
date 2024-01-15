const express = require('express');
const router = express.Router();
const authController = require('../controller/authController')


router.get('/courses', authController.allListCourse)
router.get('/resend-otp', authController.resendOTP)

router.post('/signup', authController.signUp_post)
router.post('/signin', authController.signIn_post)
router.post('/verifyotp', authController.userVerifyOTP)
router.post('/forgotPassword', authController.forgotPassword)
router.post('/forgot-otp', authController.forgotOtp)
router.post('/reset-password', authController.resetPassword)

module.exports = router