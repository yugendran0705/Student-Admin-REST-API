const { ADMIN_PASSWORD } = require('../config/dotenv');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');

const login = async (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        const token = await jwt.sign({ password }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ token })
    }
    else {
        res.status(401).json({ message: "Invalid Password" })
    }
}

const createCourse = async (req, res) => {
    const { courseName, courseCode, capacity } = req.body;
    try {
        const response = await Course.create({
            courseName,
            courseCode,
            capacity: parseInt(capacity),
        });
        res.status(200).json({ message: "Course Created" })
    }
    catch (error) {
        res.status(400).json({ message: "Course already exists" });
    }
}

const deleteCourse = async (req, res) => {
    try {
        console.log(req.body);
        const course = await Course.findOne({
            courseCode: req.body.courseCode,
            courseName: req.body.courseName
        });
        console.log(course);
        if (!course) {
            res.status(404).json({ message: error.message })
        }
        await Course.deleteOne({ courseCode: req.body.courseCode, courseName: req.body.courseName });
        res.status(200).json({ message: "Course Deleted" })
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    login,
    createCourse,
    deleteCourse
}