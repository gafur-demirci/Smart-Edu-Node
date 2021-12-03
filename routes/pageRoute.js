const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middlewares/redirectMiddleware');

const router = express.Router();

// routes

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/login').get(redirectMiddleware ,pageController.getLoginPage);
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);
router.route('/contact').post(pageController.sendEmail);

// /login veya /register a manuel olarak erişilmek istendiğinde önce ilk sırdaki middleware çalışacak
// bu sayede login durumda kullanıcı varsa index e yönlendirilmesini sağlıyoruz.

module.exports = router;