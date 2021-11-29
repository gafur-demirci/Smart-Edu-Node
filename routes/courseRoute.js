const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

// routes

router.route('/').post(courseController.createCourse);  // localhost:/courses/
router.route('/').get(courseController.getAllCourses);


module.exports = router;