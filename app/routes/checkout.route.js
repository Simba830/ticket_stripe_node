const router = require('express').Router();
const checkoutController = require('../controllers/checkout.controller');

// Checkout route
router.post('/', checkoutController.checkout);

module.exports = router;