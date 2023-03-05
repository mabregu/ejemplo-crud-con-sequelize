// Products Controller
const Product = require('../services/productsServices');
const { validationResult } = require('express-validator');

const productsController = {
    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAllProducts();
            res.status(200).json({
                success: true,
                data: products,
                total: products.length,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    // Get a product by id
    getProductById: async (req, res) => {
        try {
            const product = await Product.getProductById(req.params.id);
            res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    // Get a product by slug
    getProductBySlug: async (req, res) => {
        try {
            const product = await Product.getProductBySlug(req.params.slug);
            res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    // Get a product by field
    getProductByField: async (req, res) => {
        try {
            const product = await Product.getProductByField(req.params.field, req.params.value);
            res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    // Create a new product
    createProduct: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {            
            const product = await Product.createProduct(req.body);
            
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    // Update a product
    updateProduct: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const product = await Product.updateProduct(req.params.id, req.body);
            res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    // Soft delete a product
    softDeleteProduct: async (req, res) => {
        try {
            const product = await Product.softDeleteProduct(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully'
            });
                
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    // Restore a product
    restoreProduct: async (req, res) => {
        try {
            const product = await Product.restoreProduct(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Product restored successfully',
                data: product,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    // Delete a product
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.deleteProduct(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    // Search products with pagination
    searchProducts: async (req, res) => {
        try {
            let { page, limit, search } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);
            
            const products = await Product.getAllProductsPaginationSearch(page, limit, search);
            res.status(200).json({
                success: true,
                data: products,
                total: products.length,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
};

module.exports = productsController;