const express = require('express');
const { userRegistration,verifyEmail, resendEmail, userLogin, verifyToken, resetPassword, forgotPassword, verifyResetEmail } = require('../controller/user/authController');
const { tokenVerification } = require('../middlewares/authMiddlewares');
const { instructorSignup } = require('../controller/instructor/instructorAuth');
const { getCourses } = require('../controller/user/courseController');
const router = express.Router();


router.get('/resend-email/:id/',resendEmail);
router.get('/courses',getCourses);

router.post('/verify-email',verifyEmail);
router.post('/login',userLogin);
router.post('/register',userRegistration);
router.post('/verify-token',verifyToken);
router.post('/verify-reset-email',verifyResetEmail);

router.post('/instructor/signup',tokenVerification,instructorSignup);
router.post('/forgot-password',forgotPassword);


router.put('/reset-password',resetPassword);

module.exports = router;