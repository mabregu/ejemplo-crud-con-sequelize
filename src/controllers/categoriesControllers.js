const CategoryService = require('../services/categoriesService');
const { validationResult } = require('express-validator');

const categoriesController = {
    // Get all categories
    getAllCategories: async (req, res) => {
        try {
            const categories = await CategoryService.getAllCategories();
            res.status(200).json({
                success: true,
                data: categories,
                total: categories.length,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    // Get a category by id
    getCategoryById: async (req, res) => {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            res.status(200).json({
                success: true,
                data: category
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = categoriesController;