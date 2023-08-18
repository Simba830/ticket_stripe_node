const user_router = require('./user.routes');
const product_router = require('./product.routes');
const checkout_router = require('./checkout.route')

var router = require("express").Router();

// POST /api/auth/register
router.use('/user', user_router);
router.use('/product', product_router);
router.use('/checkout', checkout_router);


module.exports = router;