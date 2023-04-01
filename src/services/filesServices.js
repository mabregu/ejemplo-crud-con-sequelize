// File Services
const FileModel = require('../database/models').File;
const FileProduct = require('../database/models').FileProduct;
const Product = require('../database/models').Product;
const fileServices = {
    // Get all files
    getAllFiles: async () => {
        try {
            const files = await FileModel.findAll({
                attributes: ['id', 'name', 'path', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'slug', 'description', 'price', 'createdAt', 'updatedAt'],
                    },
                ],
            });
            return files;
        } catch (error) {
            throw new Error(error);
        }
    },
    // Get a file by id
    getFileById: async (id) => {
        try {
            const file = await FileModel.findByPk(id, {
                attributes: ['id', 'name', 'path', 'createdAt', 'updatedAt'],
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'slug', 'description', 'price', 'createdAt', 'updatedAt'],
                    },
                ],
            });
            return file;
        } catch (error) {
            throw new Error(error);
        }
    },
    // Create a new file
    createFile: async (file) => {
        try {
            const newFile = await FileModel.create(file);
            return newFile;
        } catch (error) {
            throw new Error(error);
        }
    },
    // Create an array of files
    createFiles: async (files, resource) => {
        try {
            const newFiles = await FileModel.bulkCreate(files);
            
            // Associate the files with the resource
            newFiles.forEach(async (file) => {
                await fileServices.setFileResource(file.id, resource);
            });
            
            return newFiles;
        } catch (error) {
            throw new Error(error);
        }
    },
    setFileResource: async (fileId, resource) => {
        try {
            const fileProduct = await FileProduct.create({
                fileId: fileId,
                productId: resource.id,
            });
            
            return fileProduct;
        } catch (error) {
            throw new Error(error);
        }
    },
    // Update a file
    updateFile: async (id, file) => {
        try {
            const fileUpdated = await FileModel.update(file, {
                where: {
                    id: id,
                },
            });
            return fileUpdated;
        } catch (error) {
            throw new Error(error);
        }
    },
    // Soft delete a file
    softDeleteFile: async (id) => {
        try {
            const fileDeleted = await FileModel.destroy({
                where: {
                    id: id,
                },
            });
            return fileDeleted;
        } catch (error) {
            throw new Error(error);
        }
    },
    // Hard delete a file
    deleteFile: async (id) => {
        try {
            const fileDeleted = await FileModel.destroy({
                where: {
                    id: id,
                },
                force: true,
            });
            return fileDeleted;
        } catch (error) {
            throw new Error(error);
        }
    }
};

module.exports = fileServices;
