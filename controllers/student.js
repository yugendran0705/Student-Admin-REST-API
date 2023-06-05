const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Course = require('../models/Course');
const student = require('../models/Student');
const { encryptPassword, checkPassword } = require("../utils/encrypt-decrypt")


const signUp = async (req, res) => {
    const { register_number, name, password, courses } = req.body;
    const student = Student.find({ register_number })
    if (student) {
        res.status(401).json({ message: "Username already exists" })
    }
    else {
        password = await encryptPassword(password)
        const newStudent = new Student({
            register_number,
            name,
            password,
            courses
        })
        newStudent.save()
        res.status(200).json({ message: "Student Created" })
    }
}

const login = async (req, res) => {
    const { register_number, password } = req.body;
    const student = Student.find({ register_number })
    if (!student) {
        res.status(401).json({ message: "Invalid Username" })
    }
    else {
        if (checkPassword(student.password, password)) {
            const token = await jwt.sign({ register_number, password }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.status(200).json({ token })
        }
        else {
            res.status(401).json({ message: "Invalid Password" })
        }
    }
}

const verifyTokenStudent = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "Token not found" })
    }
    else {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if (decoded) {
            req.student = decoded
            next()
        }
        else {
            res.status(401).json({ message: "Invalid Token" })
        }
    }
}

const registerCourse = async (req, res) => {
    const { course_id } = req.body;
    const course = await Course.findById(course_id)
    if (!course) {
        res.status(401).json({ message: "Invalid Course ID" })
    }
    else {
        const student = await Student.findById(req.student.register_number)
        if (student.courses.includes(course_id)) {
            res.status(401).json({ message: "Course already registered" })
        }
        else {
            student.courses.push(course_id)
            student.save()
            res.status(200).json({ message: "Course Registered" })
        }
    }
}

const listCourses = async (req, res) => {
    const courses = await Course.find()
    res.status(200).json({ courses })
}

const viewRegisteredCourses = async (req, res) => {
    const student = await Student.findById(req.student.register_number).populate('courses')
    res.status(200).json({ courses: student.courses })
}

module.exports = {
    signUp,
    login,
    verifyTokenStudent,
    registerCourse,
    listCourses,
    viewRegisteredCourses
}

