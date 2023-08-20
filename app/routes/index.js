const user_router = require('./user.routes');
const product_router = require('./product.route');
const checkout_router = require('./checkout.route');
const webhook_router = require('./webhook.route')

var router = require("express").Router();

// POST /api/auth/register
router.use('/user', user_router);
router.use('/product', product_router);
router.use('/checkout', checkout_router);
router.use('/webhook', webhook_router)

module.exports = router;