const bcrypt = require('bcrypt');
const User = require('../models/User');
const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        
        res.status(201).redirect('/login');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.loginUser = (req, res) => {
    try {
        const { email, password } = req.body;

        User.findOne({ email }, (err, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        // USER SESSION
                        req.session.userID = user._id;
                        res.status(200).redirect('/users/dashboard');
                    }
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID }).populate('courses');
    const categories = await Category.find();
    const courses = await Course.find({ user : req.session.userID});
    res.status(200).render('dashboard', {
        user,
        courses,
        categories,
        page_name: 'dashboard',
    });
};