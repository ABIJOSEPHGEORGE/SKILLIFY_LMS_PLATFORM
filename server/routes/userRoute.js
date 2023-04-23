const express = require('express');
const { tokenVerification } = require('../middlewares/authMiddlewares');
const {addToCart, existInCart, cartItems, deleteCartItem} = require('../controller/user/cartController');
const { parentSubCategories } = require('../controller/admin/categoryController');
const { stripeCheckout, stripPublishKey, orderConfirmation } = require('../controller/user/OrderController');
const { isEnrolled, enrolledCourses, courseProgress } = require('../controller/user/courseController');
const { getAllDiscussions } = require('../controller/user/discussionController');

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

router.post('/add-to-cart/:id',addToCart);
router.post('/checkout/stripe',stripeCheckout);

router.put('/order-confirmation',orderConfirmation);

router.delete('/cart/:id',deleteCartItem);



module.exports = router; 