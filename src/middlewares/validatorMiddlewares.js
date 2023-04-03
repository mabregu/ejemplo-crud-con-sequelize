const { body } = require('express-validator');
const validatorMiddlewares = {
    // Validate product data
    validateProductData: [
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .bail()
            .isLength({ min: 3 })
            .withMessage('Name must be at least 3 characters long')
            .bail()
        ,
        body('price')
            .notEmpty()
            .withMessage('Price is required')
            .bail()
            .isNumeric()
            .withMessage('Price must be a number')
            .bail()
        ,
    ],
    validateRegisterData: [
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .bail()
            .isLength({ min: 3 })
            .withMessage('Name must be at least 3 characters long')
            .bail()
        ,
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .bail()
            .isEmail()
            .withMessage('Email is not valid')
            .bail()
        ,
        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .bail()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .bail()
        ,
    ],
    validateLoginData: [
        body('email')
            .notEmpty()
            .withMessage('Email is required')
            .bail()
            .isEmail()
            .withMessage('Email is not valid')
            .bail()
        ,
        body('password')
            .notEmpty()
            .withMessage('Password is required')
            .bail()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .bail()
        ,
    ],
    // Validate category data
    validateCategoryData: [
        body('name')
            .notEmpty()
            .withMessage('Name is required')
            .bail()
            .isLength({ min: 3 })
            .withMessage('Name must be at least 3 characters long')
            .bail()
        ,
    ]
};

module.exports = validatorMiddlewares;