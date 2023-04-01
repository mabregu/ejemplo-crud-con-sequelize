// Products Controller
const Product = require('../services/productsServices');
const { validationResult } = require('express-validator');
const Exceptions = require('../responses/Exceptions');
const ApiDocument = require('../responses/ApiDocument');

const productsController = {
    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const products = await Product.getAllProducts();
            const apiDocument = new ApiDocument();
            
            apiDocument.addLink('self', url);
            apiDocument.addMeta('total', products.length);
            apiDocument.addData('products', products);
            
            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error getting products.',
                error.message
            );

            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
            });
        }
    },
    // Get a product by id
    getProductById: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const product = await Product.getProductById(req.params.id);
            
            apiDocument.addLink('self', url);
            apiDocument.addData('product', product);
            
            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error getting product.',
                error.message
            );
            
            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
            });
        }
    },
    // Get a product by slug
    getProductBySlug: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const product = await Product.getProductBySlug(req.params.slug);
            
            apiDocument.addLink('self', url);
            apiDocument.addData('product', product);
            
            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error getting product.',
                error.message
            );
            
            res.status(500).json({
                success: false,
                error: exceptions.getCustomError()
            });
        }
    },
    // Get a product by field
    getProductByField: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const product = await Product.getProductByField(req.params.field, req.params.value);
            
            apiDocument.addLink('self', url);
            apiDocument.addData('product', product);
            
            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error getting product.',
                error.message
            );
            
            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
            });
        }
    },
    // Create a new product
    createProduct: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const product = await Product.createProduct(req.body);
            
            apiDocument.addLink('self', url);
            apiDocument.addData('product', product);
            
            res.status(201).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error creating product.',
                error.message
            );
            
            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
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