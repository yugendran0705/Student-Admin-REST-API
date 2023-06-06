require('dotenv').config();
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    else
        token = null;
    if (!token) {
        res.status(401).json({ message: "No token provided" })
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Unauthorized" })
            }
            else {
                req.password = decoded.password;
                next();
            }
        })
    }
}

module.exports = verifyToken;