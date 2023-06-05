require('dotenv').config();
module.exports = {
    JWT_SALT: process.env.JWT_SALT,
    PORT: process.env.PORT,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    MONGO_URI: process.env.MONGO_URI
}