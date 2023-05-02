const express = require('express');
const { tokenVerification } = require('../middlewares/authMiddlewares');
const {addToCart, existInCart, cartItems, deleteCartItem} = require('../controller/user/cartController');
const { parentSubCategories } = require('../controller/admin/categoryController');
const { stripeCheckout, stripPublishKey, orderConfirmation } = require('../controller/user/OrderController');
const { isEnrolled, enrolledCourses, courseProgress, createReview,updateVideoProgress, allReviews, newCourseNote, allNotes, getVideorogress } = require('../controller/user/courseController');
const { getAllDiscussions } = require('../controller/user/discussionController');
const { editCourse } = require('../controller/instructor/courseController');
const { fetchAccountDetails, updateProfileInfo, updateProfileImage, getProfileImage, resetPassword } = require('../controller/user/accountController');
const {upload}= require('../config/multer');

const router = express.Router();

router.use(tokenVerification)

router.get('/cart/:id',existInCart);
router.get('/cart',cartItems);
router.get('/subcategories/:id',parentSubCategories);
router.get('/stripe/publish-key',stripPublishKey);
router.get('/enrolled-courses/:id',isEnrolled);
router.get('/enrolled-courses',enrolledCourses);
router.get('/discussions/:id',getAllDiscussions);
router.get('/course/progress/:id',courseProgress);
router.get('/reviews/:id',allReviews);
router.get('/course/notes/:id',tokenVerification,allNotes);
router.get('/enroll/video-progress/:id/:videoId',getVideorogress);
router.get('/account',fetchAccountDetails)
router.get('/account/profile-image',getProfileImage)

router.post('/add-to-cart/:id',addToCart);
router.post('/checkout/stripe',stripeCheckout);
router.post('/review/create/:id',createReview);
router.post('/course/notes/:id',tokenVerification,newCourseNote);

router.put('/order-confirmation',orderConfirmation);
router.put('/enroll/progress/:id/video-progress',updateVideoProgress);
router.put('/account',updateProfileInfo);

router.patch('/account/profile-image',upload.single("profile_image"),updateProfileImage);
router.patch('/account/password',resetPassword);


router.delete('/cart/:id',deleteCartItem);



module.exports = router; 