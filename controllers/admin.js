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

const verifyTokenAdmin = (req, res, next) => {
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
                req.body.password = decoded.password;
                next();
            }
        })
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
    }
    catch (error) {
        res.status(400).json({ message: "Course already exists" });
    }
    res.status(200).json({ message: "Course Created" });
}

const addStudentRegistration = async (req, res) => {
    const { courseCode, courseName, regno } = req.body;
    try {
        const course = await Course.findOne({
            courseCode,
            courseName
        });
        if (!course) {
            throw new Error("Course Not Found");
        }
        if (course.students.includes(regno)) {
            throw new Error("Already registered");
        }
        else {
            course.capacity = course.capacity - 1;
            await course.save();
            const student = await Student.findOne({
                regno
            });
            student.courses.push(course.id);
            await student.save();
            res.status(200).json({ message: "Student Registered", courseName: course.courseName, courseCode: course.courseCode })
        }
    } catch (error) {
        if (error.message == "Already registered" || error.message == "Course Not Found") {
            res.status(404).json({ message: error.message })
        }
        else {
            res.status(500).json({ message: "Internal Server Error" })
        }
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

const removeStudentRegistration = async (req, res) => {
    try {
        const course = await Course.findOne({
            courseCode: req.body.courseCode,
            courseName: req.body.courseName
        });
        if (!course) {
            throw new Error("Course Not Found");
        }
        if (!course.students.includes(req.body.regno)) {
            throw new Error("Student Not Registered");
        }
        else {
            course.capacity = course.capacity + 1;
            await course.save();
            const student = await Student.findOne({
                regno: req.body.regno
            });
            student.courses.splice(student.courses.indexOf(course.id), 1)
            await student.save();
            res.status(200).json({ message: "Student Removed", courseName: course.courseName, courseCode: course.courseCode })
        }
    } catch (error) {
        if (error.message == "Student Not Registered" || error.message == "Course Not Found") {
            res.status(404).json({ message: error.message })
        }
        else {
            res.status(500).json({ message: "Internal Server Error" })
        }
    }
}

module.exports = {
    login,
    verifyTokenAdmin,
    createCourse,
    addStudentRegistration,
    deleteCourse,
    removeStudentRegistration,
}