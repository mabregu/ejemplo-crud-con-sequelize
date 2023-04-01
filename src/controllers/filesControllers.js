const FilesServices = require('../services/filesServices');
const filesController = {
    uploadFile: async (req, res) => {
        try {
            let resource = null;
            if (req.params.resourceId) {
                resource = {
                    id: req.params.resourceId,
                    type: req.params.resourceType
                };
            }
            
            let files = req.files.map(file => {
                return {
                    name: file.filename,
                    type: file.mimetype,
                    size: file.size,
                    extension: file.originalname.split('.').pop(),
                    path: file.path
                };
            });
            
            console.log("files", files);
            
            // save files to database
            let fileSaved = await FilesServices.createFiles(files, resource);
            
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