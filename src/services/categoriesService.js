const CategoryModel = require('../database/models').Category;
const CustomError = require('../responses/Exceptions');
const categoryServices = {
    // Get all categories
    getAllCategories: async () => {
        try {
            const categories = await CategoryModel.findAll();
            return categories;
        } catch (error) {
            throw new CustomError(500, 'Error getting categories');
        }
    },
    // Get a category by id
    getCategoryById: async (id) => {
        try {
            const category = await CategoryModel.findByPk(id);
            return category;
        } catch (error) {
            throw new CustomError(500, 'Error getting category');
        }
    }
};

module.exports = categoryServices;