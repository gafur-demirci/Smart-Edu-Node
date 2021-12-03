const Course = require('../models/Course');
const User = require('../models/User');
const Category = require('../models/Category');

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name : req.body.name,
            description : req.body.description,
            category : req.body.category,
            user : req.session.userID
        });
        res.status(201).redirect('/courses');

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {

        const categorySlug = req.query.categories;
        const coursequery = req.query.search;

        const category = await Category.findOne({ slug : categorySlug });
        let filter = {}

        if ( categorySlug ) {
            filter = { category : category._id };
        }

        if ( coursequery ) {
            filter = { name : coursequery};
        }

        if ( !coursequery && !categorySlug ) {
            filter.name = '',
            filter.category = null
        }

        const courses = await Course.find({
            $or : [
                { name : { $regex : '.*' + filter.name + '.*', $options : 'i' }},
                { category : filter.category }
            ]
        }).sort('-createdAt').populate('user');

        const categories = await Category.find();

        res.status(200).render('courses', {
            courses,
            categories,
            page_name: 'courses',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.getCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        const course = await Course.findOne({ slug: req.params.slug }).populate('user');
        const categories = await Category.find();
        res.status(200).render('course', {
            user,
            course,
            categories,
            page_name: 'courses',
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.enrollCourse = async (req, res) => {
    try {
        // kayıt olan kullanıcıyı yakalama
        const user = await User.findById(req.session.userID);
        // kayıt olunan kursu yakalayıp kullanıcının courses ına ekleme
        await user.courses.push({_id : req.body.course_id});
        // işlemleri kaydetme
        await user.save();

        const categories = await Category.find();
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

exports.releaseCourse = async (req, res) => {
    try {
        // kayıt olan kullanıcıyı yakalama
        const user = await User.findById(req.session.userID);
        // kayıt olunan kursu yakalayıp kullanıcının courses ına ekleme
        await user.courses.pull({_id : req.body.course_id});
        // işlemleri kaydetme
        await user.save();

        const categories = await Category.find();
        res.status(200).redirect('/users/dashboard');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};