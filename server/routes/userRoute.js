const express = require('express');
const { tokenVerification } = require('../middlewares/authMiddlewares');
const {addToCart, existInCart, cartItems, deleteCartItem} = require('../controller/user/cartController');
const { parentSubCategories } = require('../controller/admin/categoryController');

const router = express.Router();

router.use(tokenVerification)

router.get('/cart/:id',existInCart);
router.get('/cart',cartItems);
router.get('/subcategories/:id',parentSubCategories)

router.post('/add-to-cart/:id',addToCart);

router.delete('/cart/:id',deleteCartItem);



module.exports = router; 