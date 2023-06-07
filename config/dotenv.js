require('dotenv').config();
module.exports = {
    JWT_SECRET_KEY_ADMIN: process.env.JWT_SECRET_KEY_ADMIN,
    JWT_SECRET_KEY_STUDENT: process.env.JWT_SECRET_KEY_STUDENT,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
}