const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        
        res.status(201).redirect('/login');
    } catch (error) {
        const errors = validationResult(req);
        for (let i=0; i<errors.array().length; i++ ) {

            req.flash('error', `${errors.array()[i].msg}`);
        }
        res.status(400).redirect('/register');
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
                    } else {
                        req.flash('error', 'Your Password is not correct!');
                        res.status(400).redirect('/login');
                    }
                        
                });
            } else {
                req.flash('error', 'User is not exist!');
                res.status(400).redirect('/login');
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
    const users = await User.find();
    const categories = await Category.find();
    const courses = await Course.find({ user : req.session.userID});
    res.status(200).render('dashboard', {
        user,
        users,
        courses,
        categories,
        page_name: 'dashboard',
    });
};

exports.deleteUser = async (req, res) => {
    try {

        await User.findByIdAndRemove( req.params.id );
        await Course.deleteMany( { user : req.params.id });

        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};