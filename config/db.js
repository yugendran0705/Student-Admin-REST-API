const mongoose = require("mongoose")
const { MONGO_URI } = require("./dotenv")
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
        return true
    } catch (error) {
        return false
    }

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports = connectDB;