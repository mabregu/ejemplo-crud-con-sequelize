const { log } = require('console');
const fs = require('fs');
const path = require('path');
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
                        as: 'products',
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
                        as: 'products',
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
                productId: resource.id
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
    },
    // Delete a file from storage
    deleteFileFromStorage: async (path) => {
        let fileWasDeleted = false;
        try {
            let fileExists = fs.existsSync(path);
            
            if (fileExists) {
                fs.unlinkSync(path);
                fileWasDeleted = true;
            }
            
            return fileWasDeleted;
        } catch (error) {
            throw new Error(error);
        }
    },
    orderFiles: async (files, resource) => {
        try {
            // Get the files that are already associated with the resource
            let resourceFiles = await fileServices.getResourceFiles(resource.id);
            
            // Get the files that are not associated with the resource
            let filesToAssociate = files.filter((file) => {
                return !resourceFiles.find((resourceFile) => {
                    return resourceFile.id === file.id;
                });
            });
            
            // Associate the files with the resource
            filesToAssociate.forEach(async (file) => {
                await fileServices.setFileResource(file.id, resource);
            });
            
            // Get the files that are not in the request
            let filesToDelete = resourceFiles.filter((resourceFile) => {
                return !files.find((file) => {
                    return resourceFile.id === file.id;
                });
            });
            
            // Delete the files that are not in the request
            filesToDelete.forEach(async (file) => {
                await fileServices.deleteFile(file.id);
            });
            
            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
};

module.exports = fileServices;
