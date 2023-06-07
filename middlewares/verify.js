require('dotenv').config();
const jwt = require('jsonwebtoken');
const verifyTokenAdmin = (req, res, next) => {
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
        jwt.verify(token, process.env.JWT_SECRET_KEY_ADMIN, (err, decoded) => {
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

const verifyTokenStudent = (req, res, next) => {
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
        jwt.verify(token, process.env.JWT_SECRET_KEY_STUDENT, (err, decoded) => {
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

module.exports = {
    verifyTokenAdmin,
    verifyTokenStudent
}