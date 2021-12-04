const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User = require('../models/User');


const router = express.Router();

// Routes

router.route('/signup').post(
    [
        body('name').not().isEmpty().withMessage('Please enter your name'),


        body('email').isEmail().withMessage('Please enter valid Email')
        .custom((userEmail) => {
            return User.findOne({email : userEmail}).then(user => {
                if (user) {
                    return Promise.reject('This Email is already exist!');
                }
            })
        }),


        body('password').not().isEmpty().withMessage('Please enter A password'),

    ],authController.createUser);                                                   // localhost:3000/users/signup 
router.route('/login').post(authController.loginUser);                              // localhost:3000/users/login
router.route('/logout').get(authController.logoutUser);                             // localhost:3000/users/logout
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);    // localhost:3000/users/dashboard 
router.route('/:id').delete(authController.deleteUser);                             // localhost:3000/users/id

// users/dashboard a manuel olarak erişilmek istendiğinde önce ilk sırdaki middleware çalışacak
// bu sayede logout durumda kullanıcı olmadığı için logine yönlendirilmesin sağlıyoruz.

module.exports = router;