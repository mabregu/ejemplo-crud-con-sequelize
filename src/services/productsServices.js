// database
// const productsList = [
//     {
//         id: 1,
//         name: 'Product 1',
//         description: 'Product 1 description',
//         price: 100,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     },
//     {
//         id: 2,
//         name: 'Product 2',
//         description: 'Product 2 description',
//         price: 200,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     },
//     {
//         id: 3,
//         name: 'Product 3',
//         description: 'Product 3 description',
//         price: 300,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     },
// ]
// Exceptions
const CustomError = require('../responses/Exceptions');
// Product model sequelize
const Product = require('../database/models').Product;
const Category = require('../database/models').Category;
const Provider = require('../database/models').Provider;
const ProductState = require('../database/models').ProductState;
const FileModel = require('../database/models').File;
// Services for products
const productServices = {
    // Get all products
    getAllProducts: async () => {
        try {
            // const products = productsList;
            const products = await Product.findAll({
                attributes: ['id', 'name', 'slug', 'description', 'price', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name', 'description'],
                    },
                    {
                        model: Provider,
                        as: 'provider',
                        attributes: ['id', 'name', 'description'],
                    },
                    {
                        model: ProductState,
                        as: 'productState',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: FileModel,
                        as: 'files',
                        attributes: ['id', 'name', 'path'],
                    }
                ],
            });
            
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // Get a product by id
    getProductById: async (id) => {
        try {
            // const product = productsList.find((product) => product.id === parseInt(id));
            const product = await Product.findByPk(id, {
                attributes: ['id', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name', 'description'],
                    },
                    {
                        model: Provider,
                        as: 'provider',
                        attributes: ['id', 'name', 'description'],
                    },
                    {
                        model: ProductState,
                        as: 'productState',
                        attributes: ['id', 'name'],
                    },
                ],
            });
            
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // Get a product by slug
    getProductBySlug: async (slug) => {
        try {
            const product = await Product.findOne({
                where: {
                    slug: slug,
                },
                attributes: ['id', 'name', 'slug', 'description', 'price', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name', 'description'],
                    },
                    {
                        model: Provider,
                        as: 'provider',
                        attributes: ['id', 'name', 'description'],
                    },
                    {
                        model: ProductState,
                        as: 'productState',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: FileModel,
                        as: 'files',
                        attributes: ['id', 'name', 'path'],
                    }
                ],
            });
            
            return product;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // Create a product
    createProduct: async (product) => {
        try {
            product.slug = product.name.toLowerCase().replace(/ /g, '-');
            
            const newProduct = await Product.create(product);
            
            return newProduct;
        } catch (error) {
            // TODO: Create logger for errors
            // let objError = {
            //     code: error.code,
            //     errno: error.errno,
            //     sqlState: error.sqlState,
            //     sqlMessage: error.sqlMessage,
            //     sql: error.sql,
            //     parameters: error.parameters,
            // };
            let message = error.message;
            if (error.errors) {
                message = error.errors[0].message;
            }
            throw new CustomError(`Error creating product: ${message}`, error, 500);
        }
    },
    // Update a product
    updateProduct: async (id, product) => {
        try {
            let updatedProduct = await Product.update(product, {
                where: {
                    id: id,
                },
            });
            
            if (updatedProduct) {
                updatedProduct = productServices.getProductById(id);
            }
            
            return updatedProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // Soft delete a product
    softDeleteProduct: async (id) => {
        try {
            const deletedProduct = await Product.update({
                deletedAt: new Date(),
            }, {
                where: {
                    id: id,
                },
            });
            
            return deletedProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // Restore a product
    restoreProduct: async (id) => {
        try {
            const restoredProduct = await Product.update({
                deletedAt: null,
            }, {
                where: {
                    id: id,
                },
            });
            
            return restoredProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // Delete a product
    deleteProduct: async (id) => {
        try {
            let product = await Product.findByPk(id, {
                include: [
                    {
                        association: 'files',
                        attributes: ['id', 'name', 'path'],
                    }
                ],
            });
            
            // Eliminar fisicamente los files del producto
            product.files.forEach(async (file) => {
                await file.destroy();
            });
            // Eliminar fisicamente el producto y sus relaciones con files y fileproducts
            const deletedProduct = await Product.destroy({
                where: {
                    id: id,
                }
            });
            
            return deletedProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // Get all products with pagination and search
    getAllProductsPaginationSearch: async (page, limit, search) => {
        try {
            const products = await Product.findAll({
                attributes: ['id', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name', 'description'],
                    },
                    {
                        model: Provider,
                        as: 'provider',
                        attributes: ['id', 'name', 'description'],
                    },
                    {
                        model: ProductState,
                        as: 'productState',
                        attributes: ['id', 'name'],
                    },
                ],
                where: {
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                },
                offset: (page - 1) * limit,
                limit: limit,
            });
            
            return products;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    addFileToProduct: async (id, file) => {
        try {
            const product = productServices.getProductById(id);
            const fileAdded = await product.addFile(file);
            
            return fileAdded;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = productServices;