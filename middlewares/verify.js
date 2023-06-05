require('dotenv').config();
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
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