const express = require('express');
const router = express.Router();
const { validateLoginData } = require('../middlewares/validatorMiddlewares');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', validateLoginData, authController.login);
router.post('/register', authController.register);
router.get('/logout', authMiddleware, authController.logout);

module.exports = router;