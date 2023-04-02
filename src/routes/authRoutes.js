const express = require('express');
const router = express.Router();
const { validateUserData } = require('../middlewares/validatorMiddlewares');
const authController = require('../controllers/authController');

router.post('/login', validateUserData, authController.login);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

module.exports = router;