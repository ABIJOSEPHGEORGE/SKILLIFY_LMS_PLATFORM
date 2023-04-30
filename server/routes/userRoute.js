const express = require('express');
const { tokenVerification } = require('../middlewares/authMiddlewares');
const {addToCart, existInCart, cartItems, deleteCartItem} = require('../controller/user/cartController');
const { parentSubCategories } = require('../controller/admin/categoryController');
const { stripeCheckout, stripPublishKey, orderConfirmation } = require('../controller/user/OrderController');
const { isEnrolled, enrolledCourses, courseProgress, createReview,updateVideoProgress, allReviews, newCourseNote, allNotes } = require('../controller/user/courseController');
const { getAllDiscussions } = require('../controller/user/discussionController');
const { editCourse } = require('../controller/instructor/courseController');

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
router.get('/course/notes/:id',tokenVerification,allNotes)

router.post('/add-to-cart/:id',addToCart);
router.post('/checkout/stripe',stripeCheckout);
router.post('/review/create/:id',createReview);
router.post('/course/notes/:id',tokenVerification,newCourseNote);

router.put('/order-confirmation',orderConfirmation);
router.put('/enroll/progress/:id/video-progress',updateVideoProgress)


router.delete('/cart/:id',deleteCartItem);



module.exports = router; 