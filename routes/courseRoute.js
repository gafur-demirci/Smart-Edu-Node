const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// routes

router.route('/').post(roleMiddleware(['teacher', 'admin']), courseController.createCourse); // localhost:/courses/  (kurs ekleme)
router.route('/').get(courseController.getAllCourses); // localhost:/courses/  (kursları listeleme)
router.route('/:slug').get(courseController.getCourse); // localhost:/courses/id  (tekil kurs getirme)

module.exports = router;