const Exceptions = require('../responses/Exceptions');
const ApiDocument = require('../responses/ApiDocument');

const FilesServices = require('../services/filesServices');
const filesController = {
    uploadFile: async (req, res) => {
        try {
            let resource = null;
            if (req.params.id) {
                resource = {
                    id: req.params.id,
                    type: req.params.resourceType
                };
            }
            
            let files = req.files.map((file, index) => {
                return {
                    name: file.filename,
                    type: file.mimetype,
                    size: file.size,
                    extension: file.originalname.split('.').pop(),
                    path: file.path,
                    order_file: file.order_file || index
                };
            });
            
            // save files to database
            let fileSaved = await FilesServices.createFiles(files, resource);
            
            res.status(200).json({
                success: true,
                message: 'Files uploaded successfully',
                data: fileSaved
            });
        } catch (error) {
            const exception = new Exceptions(
                'Internal Server Error.',
                error.message
            );
            
            res.status(500).json({
                success: exception.getSuccess(),
                error: exception.getCustomError()
            });
        }
    },
    getFiles: async (req, res) => {
        try {
            let { resourceType } = req.params;
            let files = await FilesServices.getAllFiles();
            
            if (!files) {
                return res.status(404).json({
                    success: false,
                    message: 'Files not found'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'Files found successfully',
                data: files
            });
        } catch (error) {
            const exception = new Exceptions(
                'Internal Server Error.',
                error.message
            );
            
            res.status(500).json({
                success: exception.getSuccess(),
                error: exception.getCustomError()
            });
        }
    },
    getFile: async (req, res) => {
        try {
            let { id, resourceType } = req.params;
            let file = await FilesServices.getFileById(id);
            
            if (!file) {
                return res.status(404).json({
                    success: false,
                    message: 'File not found'
                });
            }
            
            res.status(200).json({
                success: true,
                message: 'File found successfully',
                data: file
            });
        } catch (error) {
            const exception = new Exceptions(
                'Internal Server Error.',
                error.message
            );
            
            res.status(500).json({
                success: exception.getSuccess(),
                error: exception.getCustomError()
            });
        }
    },
    updateFile: async (req, res) => {
        try {
            let { id } = req.params;
            let { name, type, size, extension, path, order_file } = req.body;
            let file = await FilesServices.getFileById(id);
            
            if (!file) {
                return res.status(404).json({
                    success: false,
                    message: 'File not found'
                });
            }
            
            let fileUpdated = await FilesServices.updateFile(id, {
                name,
                type,
                size,
                extension,
                path,
                order_file
            });
            
            res.status(200).json({
                success: true,
                message: 'File updated successfully',
                data: fileUpdated
            });
        } catch (error) {
            const exception = new Exceptions(
                'Internal Server Error.',
                error.message
            );
            
            res.status(500).json({
                success: exception.getSuccess(),
                error: exception.getCustomError()
            });
        }
    },
    deleteFile: async (req, res) => {
        try {            
            let { id } = req.params;
            let file = await FilesServices.getFileById(id);
            
            if (!file) {
                return res.status(404).json({
                    success: false,
                    message: 'File not found'
                });
            }
            
            // delete file from database
            let fileDeleted = await FilesServices.deleteFile(id);
            // delete file from storage
            if (fileDeleted) {
                await FilesServices.deleteFileFromStorage(file.path);
            }
            
            res.status(200).json({
                success: true,
                message: 'File deleted successfully'
            });
        } catch (error) {
            const exception = new Exceptions(
                'Internal Server Error.',
                error.message
            );
            
            res.status(500).json({
                success: exception.getSuccess(),
                error: exception.getCustomError()
            });
        }
    }
}

module.exports = filesController;