require('dotenv').config()
const jwt = require('jsonwebtoken');
const User = require('../database/models').User;
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ msg: 'Token is not valid' });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: 'Token is not valid',
            error: error.message
        });
    }
};

module.exports = authMiddleware;