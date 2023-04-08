const Exceptions = require('../responses/Exceptions');
const ApiDocument = require('../responses/ApiDocument');
const usersService = require('../services/usersService');
const usersController = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const users = await usersService.getAllUsers();
            const apiDocument = new ApiDocument();

            apiDocument.addLink('self', url);
            apiDocument.addMeta('total', users.length);
            apiDocument.addData('users', users);

            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error getting users.',
                error.message
            );

            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
            });
        }
    },
    // Get a user by id
    getUserById: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const user = await usersService.getUserById(req.params.id);

            apiDocument.addLink('self', url);
            apiDocument.addData('user', user);

            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error getting user.',
                error.message
            );
            
            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
            });
        }
    },
    // Create a new user
    createUser: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const user = await usersService.createUser(req.body);

            apiDocument.addLink('self', url);
            apiDocument.addData('user', user);

            res.status(201).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error creating user.',
                error.message
            );
            
            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
            });
        }
    },
    // Update a user
    updateUser: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const user = await usersService.updateUser(req.params.id, req.body);

            apiDocument.addLink('self', url);
            apiDocument.addData('user', user);

            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error updating user.',
                error.message
            );
            
            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
            });
        }
    },
    softDeleteUser: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const user = await usersService.softDeleteUser(req.params.id);
            
            apiDocument.addLink('self', url);
            apiDocument.addData('user', user);
            
            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error soft deleting user.',
                error.message
            );
            
            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
            });
        }
    },
    // Delete a user
    deleteUser: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const user = await usersService.deleteUser(req.params.id);

            apiDocument.addLink('self', url);
            apiDocument.addData('user', user);

            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error deleting user.',
                error.message
            );
            
            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
            });
        }
    }
};

module.exports = usersController;