const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Profile
router.get('/profile', authMiddleware, userController.getProfile);

// Sales
router.get('/sales', authMiddleware, userController.getSales);
router.get('/sales/:id', authMiddleware, userController.getSaleById);

// // Purchases
// router.get('/purchases', authMiddleware, userController.getPurchases);
// router.get('/purchases/:id', authMiddleware, userController.getPurchaseById);

// // Addresses
// router.get('/addresses', authMiddleware, userController.getAddresses);
// router.get('/addresses/:id', authMiddleware, userController.getAddressById);
// router.post('/addresses', authMiddleware, userController.createAddress);
// router.put('/addresses/:id', authMiddleware, userController.updateAddress);
// router.delete('/addresses/:id', authMiddleware, userController.deleteAddress);

// // Cards
// router.get('/cards', authMiddleware, userController.getCards);
// router.get('/cards/:id', authMiddleware, userController.getCardById);
// router.post('/cards', authMiddleware, userController.createCard);
// router.put('/cards/:id', authMiddleware, userController.updateCard);
// router.delete('/cards/:id', authMiddleware, userController.deleteCard);

module.exports = router;
