const authController = require('../controllers/user.controller');

var router = require("express").Router();

// POST /api/auth/register
router.post('/register', authController.register);

// POST /api/auth/login
router.post('/login', authController.login);
module.exports = router;