const express = require('express');
const { tokenVerification } = require('../middlewares/authMiddlewares');
const {addToCart, existInCart, cartItems, deleteCartItem} = require('../controller/user/cartController');
const { parentSubCategories } = require('../controller/admin/categoryController');
const { stripeCheckout, stripPublishKey, orderConfirmation } = require('../controller/user/OrderController');

const router = express.Router();

router.use(tokenVerification)

router.get('/cart/:id',existInCart);
router.get('/cart',cartItems);
router.get('/subcategories/:id',parentSubCategories);
router.get('/stripe/publish-key',stripPublishKey)

router.post('/add-to-cart/:id',addToCart);
router.post('/checkout/stripe',stripeCheckout);

router.put('/order-confirmation',orderConfirmation);

router.delete('/cart/:id',deleteCartItem);



module.exports = router; 