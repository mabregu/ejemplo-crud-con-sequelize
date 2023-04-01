const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesControllers');

// Get all categories
router.get('/', categoriesController.getAllCategories);
// Get a category by id
router.get('/:id', categoriesController.getCategoryById);

module.exports = router;