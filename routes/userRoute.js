const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

// Routes

router.route('/signup').post(authController.createUser);                            // localhost:3000/users/signup                              // 
router.route('/login').post(authController.loginUser);                              // localhost:3000/users/login
router.route('/logout').get(authController.logoutUser);                             // localhost:3000/users/logout
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);    // localhost:3000/users/dashboard 
// users/dashboard a manuel olarak erişilmek istendiğinde önce ilk sırdaki middleware çalışacak
// bu sayede logout durumda kullanıcı olmadığı için logine yönlendirilmesin sağlıyoruz.

module.exports = router;