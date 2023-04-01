// Products Routes
const express = require('express');
const router = express.Router();
const { validateProductData } = require('../middlewares/validatorMiddlewares');

const productsController = require('../controllers/productsControllers');

// Get all products
router.get('/', productsController.getAllProducts);

// Get a product by slug
router.get('/:slug', productsController.getProductBySlug);

// Create a new product
router.post('/', validateProductData, productsController.createProduct);

// Update a product
router.put('/:id', validateProductData, productsController.updateProduct);

// Soft Delete a product
router.delete('/:id', productsController.softDeleteProduct);

// Hard Delete a product
router.delete('/destroy/:id', productsController.deleteProduct);

module.exports = router;