const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// Routes

router.route('/').post(categoryController.createCategory);          // localhost:/categories
router.route('/:id').delete(categoryController.deleteCategory);     // localhost:/categories/id

module.exports = router;