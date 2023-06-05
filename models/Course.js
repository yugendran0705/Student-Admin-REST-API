const mongoose = require("mongoose")
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        require: true,
        unique: true
    },
    courseCode: {
        type: String,
        require: true,
        unique: true
    },
    capacity: {
        type: Number,
        require: true
    },
})

module.exports = mongoose.model("Course", courseSchema)