const FilesServices = require('../services/filesServices');
const filesController = {
    createFile: async (req, res) => {
        try {
            let files = req.files.map(file => {
                return {
                    name: file.filename,
                    type: file.mimetype,
                    size: file.size,
                    extension: file.originalname.split('.').pop(),
                    path: file.path
                };
            });

            let newFiles = await FilesServices.createFile(files);

            res.status(200).json({
                success: true,
                message: 'File created successfully',
                data: newFiles
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    uploadFile: async (req, res) => {
        try {
            let files = req.files.map(file => {
                return {
                    name: file.filename,
                    type: file.mimetype,
                    size: file.size,
                    extension: file.originalname.split('.').pop(),
                    path: file.path
                };
            });
            
            // save files to database
            let fileSaved = await FilesServices.createFiles(files);
            
            res.status(200).json({
                success: true,
                message: 'Files uploaded successfully',
                data: fileSaved
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
    deleteFile: (req, res) => {
        try {
            let { id } = req.params;
            
            console.log(id);
            
            res.status(200).json({
                success: true,
                message: 'File deleted successfully',
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },
}

module.exports = filesController;