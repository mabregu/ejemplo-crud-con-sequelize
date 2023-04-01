const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authServices = require('../services/authServices');
const { check, validationResult } = require('express-validator');

// Register a new user
router.post('/register', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await authServices.register(req.body);
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

// Login a user
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await authServices.login(req.body);
        
        const payload = {
            user: {
                id: user.id,
                username: user.username,
            }
        };
        
        jwt.sign(payload, config.jwtSecret, { expiresIn: 360000 }, (err, token) => {
        
            return res.status(200).json(user);
        });
    } catch (error) {
        next(error);
    }
});

