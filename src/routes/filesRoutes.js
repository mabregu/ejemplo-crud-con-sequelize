// Files routes
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const filesController = require('../controllers/filesControllers');

router.get('/:resourceType', filesController.getFiles);
router.get('/:id/:resourceType', filesController.getFile);
// Upload a file
router.post('/:id/:resourceType', upload, filesController.uploadFile);
// Delete a file
router.delete('/:id/:resourceType', filesController.deleteFile);
// Update a file
router.put('/update/:id', filesController.updateFile);

module.exports = router;