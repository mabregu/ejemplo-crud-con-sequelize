const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

// Get all users
router.get('/', usersController.getAllUsers);
// Get a user by id
router.get('/:id', usersController.getUserById);
// Create a new user
router.post('/', usersController.createUser);
// Update a user
router.put('/:id', usersController.updateUser);
// Soft Delete a user
router.delete('/:id', usersController.softDeleteUser);
// Hard Delete a user
router.delete('/destroy/:id', usersController.deleteUser);

module.exports = router;