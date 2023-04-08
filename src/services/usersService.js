const User = require('../database/models').User;
require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.TOKEN_SECRET;
const jwtExpirySeconds = process.env.TOKEN_EXPIRY_SECONDS || 300;
const bcrypt = require('bcrypt');
// const config = require('../config/config');
const usersService = {
    // Get all users
    getAllUsers: async () => {
        return await User.findAll({
            attributes: ['id', 'name', 'email', 'phone', 'roleId', 'createdAt'],
            where: {
                deletedAt: null
            }
        });
    },
    // Get a user by id
    getUserById: async (id) => {
        return await User.findByPk(id, {
            attributes: ['id', 'name', 'email', 'phone', 'roleId', 'createdAt'],
            where: {
                deletedAt: null
            }
        });
    },
    // Create a new user
    createUser: async (user) => {
        return await User.create(user);
    },
    // Update a user
    updateUser: async (id, user) => {
        return await User.update(user, {
            where: {
                id: id
            }
        });
    },
    // Soft Delete a user
    softDeleteUser: async (id) => {
        return await User.update({
            deletedAt: new Date()
        }, {
            where: {
                id: id
            }
        });
    },
    // Hard Delete a user
    deleteUser: async (id) => {
        return await User.destroy({
            where: {
                id: id
            }
        });
    },
    // Login a user
    login: async (email, password) => {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error('User does not exist.');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Credentials do not match.');
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

        return {
            token,
            user
        };
    },
    // Get a user by token
    // getUserByToken: async (token) => {
    //     const decoded = jwt.verify(token, config.jwtSecret);

    //     return await User.findByPk(decoded.id);
    // },
    // logout a user
    logout: async (token) => {
        return await jwt.destroy(token);
    },
    // refresh a user token
    // refresh: async (token) => {
    //     const decoded = jwt.verify(token, config.jwtSecret);

    //     const newToken = jwt.sign({
    //         id: decoded.id
    //     }, config.jwtSecret, {
    //         expiresIn: '1h'
    //     });

    //     return newToken;
    // },
    // reset a user password
    resetPassword: async (email, password) => {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        
        if (!user) {
            throw new Error('User does not exist.');
        }
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        return await User.update({
            password: hash
        }, {
            where: {
                id: user.id
            }
        });
    },
    // register a user
    register: async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        
        user.password = hash;
        
        return await User.create(user);
    }
};

module.exports = usersService;