const jwt = require('jsonwebtoken');
const secretKey = 'myNodeApp'; // Use an environment variable for this in production
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Replace with your secret key or use environment variable
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
