const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.secret_key;

const verifyNewScheduleToken = (req, res, next) => {
    const token = JSON.parse(req.body.headers['token']);
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }

    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token' });
        }

        next();
    });
}

module.exports = verifyNewScheduleToken;
