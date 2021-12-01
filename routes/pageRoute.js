const express = require('express');
const pageController = require('../controllers/pageController');

const router = express.Router();

// routes

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/dashboard').get(pageController.getDashboardPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/login').get(pageController.getLoginPage);
router.route('/register').get(pageController.getRegisterPage);

module.exports = router;