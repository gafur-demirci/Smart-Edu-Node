const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Routes

router.route('/signup').post(authController.createUser); // localhost:/users/signup

module.exports = router;