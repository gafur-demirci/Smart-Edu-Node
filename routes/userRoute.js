const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Routes

router.route('/signup').post(authController.createUser); // localhost:3000/users/signup
router.route('/login').post(authController.loginUser);   // locolhost:3000/users/login
router.route('/logout').get(authController.logoutUser);  // localhost:3000/users/logout

module.exports = router;