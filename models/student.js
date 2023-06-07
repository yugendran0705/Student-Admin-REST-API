const mongoose = require('mongoose')
const studentSchema = mongoose.Schema({
    regno: {
        type: Number,
        unique: true,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    courses: [{
        type: String
    }],
    role: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Student', studentSchema)
