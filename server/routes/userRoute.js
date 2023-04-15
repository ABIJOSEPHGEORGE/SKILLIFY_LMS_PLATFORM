const express = require('express');
const { tokenVerification } = require('../middlewares/authMiddlewares');
const {addToCart, existInCart} = require('../controller/user/cartController')

const router = express.Router();

router.use(tokenVerification)

router.get('/cart/:id',existInCart)

router.post('/add-to-cart/:id',addToCart)



module.exports = router; 