const Exceptions = require('../responses/Exceptions');
const ApiDocument = require('../responses/ApiDocument');
const userService = require('../services/userService');
const usersController = {
    getProfile: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const user = await userService.getUserByEmail(req.user.email);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            
            apiDocument.addLink('self', url);
            apiDocument.addData('user', user);
            
            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error getting user profile.',
                error.message
            );
            
            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
            });
        }
    },
    getSales: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const sales = await userService.getSales(req.user.id);
            
            if (!sales) {
                return res.status(404).json({
                    success: false,
                    message: 'Sales not found'
                });
            }
            
            apiDocument.addLink('self', url);
            apiDocument.addData('sales', sales);
            
            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error getting user sales.',
                error.message
            );
            
            res.status(500).json({
                success: exceptions.getSuccess(),
                error: exceptions.getCustomError()
            });
        }
    },
    getSaleById: async (req, res) => {
        try {
            const url = req.protocol + '://' + req.get('host') + req.originalUrl;
            const apiDocument = new ApiDocument();
            const sale = await userService.getSaleById(req.user.id, req.params.id);
            
            if (!sale) {
                return res.status(404).json({
                    success: false,
                    message: 'Sale not found'
                });
            }
            
            apiDocument.addLink('self', url);
            apiDocument.addData('sale', sale);
            
            res.status(200).json(apiDocument.getResponse());
        } catch (error) {
            const exceptions = new Exceptions(
                'Error getting user sale by id.',
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