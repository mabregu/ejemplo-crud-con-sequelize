require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.TOKEN_SECRET;
const jwtExpirySeconds = process.env.TOKEN_EXPIRY_SECONDS || 300;
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../database/models').User;

const authController = {
    login: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: errors.array()
                });
            }
            
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'User not found'
                });
            }
            
            const validPassword = await bcrypt.compare(password, user.password);
            
            if (!validPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Credentials are not valid'
                });
            }

            const payload = {
                id: user.id,
                email: user.email,
                name: user.name,
                roleId: user.roleId
            };
            
            const token = jwt.sign(payload, jwtSecret, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
            });
            
            res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 });
            
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    },
    register: async (req, res) => {
        const { email, password, name } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name
        });
        
        res.status(200).json({ message: 'User created successfully' });
    }
};

module.exports = authController;