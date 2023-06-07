const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    admin_id: {
        type: Number,
        require: true,
        unique: true
    },
    role: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model("Admin", adminSchema)