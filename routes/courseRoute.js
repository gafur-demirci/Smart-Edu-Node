const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const Course = require('../models/Course');

const router = express.Router();

// routes

router.route('/').post(roleMiddleware(['teacher', 'admin']), courseController.createCourse); // localhost:/courses/  (kurs ekleme)
router.route('/').get(courseController.getAllCourses); // localhost:/courses/  (kursları listeleme)
router.route('/:slug').get(courseController.getCourse); // localhost:/courses/id  (tekil kurs getirme)
router.route('/enroll').post(courseController.enrollCourse); // localhost:3000/courses/enroll

module.exports = router;