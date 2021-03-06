const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');
const Course = require('../models/Course');

const router = express.Router();

// routes

router.route('/').post(roleMiddleware(['teacher', 'admin']), courseController.createCourse); // localhost:/courses/  (kurs ekleme)
router.route('/').get(courseController.getAllCourses);                                       // localhost:/courses/  (kursları listeleme)
router.route('/:slug').get(courseController.getCourse);                                      // localhost:/courses/id  (tekil kurs getirme)
router.route('/:slug').delete(courseController.deleteCourse);                                // localhost:/courses/slug?_method=DELETE (kurs silme)
router.route('/:slug').put(courseController.updateCourse);                                   // localhost:/courses/slug?_method=DELETE (kurs güncelleme)
router.route('/enroll').post(courseController.enrollCourse);                                 // localhost:3000/courses/enroll
router.route('/release').post(courseController.releaseCourse);                               // localhost:3000/courses/release

module.exports = router;