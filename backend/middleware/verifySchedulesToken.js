const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.secret_key;

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }

    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    });
}

module.exports = verifyToken;
