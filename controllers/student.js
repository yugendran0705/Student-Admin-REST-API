const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Course = require('../models/Course');
const { encryptPassword, checkPassword } = require("../utils/encrypt-decrypt")


const signUp = async (req, res) => {
    const { register_number, name, password, courses } = req.body;
    if (!register_number || !name || !password || !courses) {
        res.status(400).json({ message: "Invalid Input" })
        return;
    }
    course_list = String(courses).split(",")
    password_hash = encryptPassword(password)
    const courses_check = await Course.find({ courseName: { $in: course_list } })
    if (courses_check.length !== course_list.length) {
        res.status(400).json({ message: "Invalid Course" })
        return;
    }
    try {

        const response = await Student.create({
            regno: register_number,
            name: name,
            password: password_hash,
            courses: course_list
        })
        res.status(200).json({ message: "Student Created" })
    }
    catch (error) {
        res.status(400).json({ message: "Student already exists" })
    }
}

const login = async (req, res) => {
    const { register_number, password } = req.body;
    if (!register_number || !password) {
        res.status(400).json({ message: "Invalid Input" })
        return;
    }
    const student = await Student.findOne({ regno: register_number })

    if (!student) {
        res.status(401).json({ message: "Invalid Username" })
    }
    else {
        const flag = checkPassword(String(student.password), String(password))
        if (flag) {
            const token = jwt.sign({ register_number, password }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.status(200).json({ token })
        }
        else {
            res.status(401).json({ message: "Invalid Password" })
        }
    }
}

const registerCourse = async (req, res) => {
    const { course_id, register_number } = req.body;
    if (!course_id || !register_number) {
        res.status(400).json({ message: "Invalid Input" })
        return;
    }
    const course = await Course.findOne({ courseCode: course_id })
    if (!course) {
        res.status(401).json({ message: "Invalid Course ID" })
        return;
    }
    else {
        const student = await Student.findOne({ regno: register_number })
        if (!student) {
            res.status(401).json({ message: "Invalid Register Number" })
            return;
        }
        if (student.courses.includes(course_id)) {
            res.status(401).json({ message: "Course already registered" })
        }
        else {
            student.courses.push(course_id)
            Student.findByIdAndUpdate(req.register_number, student)
            res.status(200).json({ message: "Course Registered" })
        }
    }
}

const listCourses = async (req, res) => {
    const courses = await Course.find()
    res.status(200).json({ courses })
}

const viewRegisteredCourses = async (req, res) => {
    const { register_number } = req.body;
    const student = await Student.findOne({ regno: register_number }).populate('courses')  // populate() is used to get the details of the courses from the course_id
    res.status(200).json({ courses: student.courses })
}

module.exports = {
    signUp,
    login,
    registerCourse,
    listCourses,
    viewRegisteredCourses
}

