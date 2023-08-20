const checkoutController = require('../controllers/checkout.controller');

var router = require("express").Router();

router.post('/', checkoutController.webhook);

module.exports = router;