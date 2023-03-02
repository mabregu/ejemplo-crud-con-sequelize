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
// Product model sequelize
const Product = require('../database/models').Product;
const Category = require('../database/models').Category;
const Provider = require('../database/models').Provider;
const ProductState = require('../database/models').ProductState;
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
            // const product = productsList.find((product) => product.slug === slug);
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
            // const newProduct = {
            //     id: productsList.length + 1,
            //     name: product.name,
            //     description: product.description,
            //     price: product.price,
            //     createdAt: new Date(),
            //     updatedAt: new Date(),
            // };
            // productsList.push(newProduct);
            const newProduct = await Product.create(product);
            
            return newProduct;
        } catch (error) {
            throw new Error(error.message);
        }
    },
    // Update a product
    updateProduct: async (id, product) => {
        try {
            // const index = productsList.findIndex((product) => product.id === parseInt(id));
            // productsList[index] = {
            //     ...productsList[index],
            //     name: product.name,
            //     description: product.description,
            //     price: product.price,
            //     updatedAt: new Date(),
            // };
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
            // const index = productsList.findIndex((product) => product.id === parseInt(id));
            // productsList.splice(index, 1);
            const deletedProduct = await Product.destroy({
                where: {
                    id: id,
                },
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
    }
};

module.exports = productServices;