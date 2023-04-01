const jwt = require('jsonwebtoken');
const User = require('../database/models').User;
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.user.id);

        if (!user) {
            return res.status(401).json({ msg: 'Token is not valid' });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;