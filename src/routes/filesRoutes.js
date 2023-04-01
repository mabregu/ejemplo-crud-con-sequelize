// Files routes
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const filesController = require('../controllers/filesControllers');

// Upload a file
router.post('/:resourceId/:resourceType', upload, filesController.uploadFile);

// Delete a file
router.delete('/:id', filesController.deleteFile);

module.exports = router;