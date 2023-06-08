const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Course = require('../models/Course');
const { encryptPassword, checkPassword } = require("../utils/encrypt-decrypt")


const signUp = async (req, res) => {
    const { register_number, name, password, courses, role } = req.body;
    if (!register_number || !name || !password || !courses || !role) {
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
            courses: course_list,
            role: role
        })
        res.status(201).json({ message: "Student Created" })
    }
    catch (error) {
        res.status(409).json({ message: "Student already exists" })
    }
}

const login = async (req, res) => {
    const { register_number, password, role } = req.body;
    if (!register_number || !password || !role) {
        res.status(400).json({ message: "Invalid Input" })
        return;
    }
    const student = await Student.findOne({ regno: register_number })

    if (!student || student.role !== "student") {
        res.status(401).json({ message: "Invalid Register Number" })
    }
    else {
        const flag = checkPassword(String(student.password), String(password))
        if (flag) {
            const token = jwt.sign({ register_number, role }, process.env.JWT_SECRET_KEY_STUDENT, { expiresIn: '1h' })
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
        if (!student || student.role !== "student") {
            res.status(401).json({ message: "Invalid Register Number" })
            return;
        }
        course_name = course.courseName
        if (student.courses.includes(course_name)) {
            res.status(409).json({ message: "Course already registered" })
        }
        else {
            student.courses.push(course_name)
            await student.save()
            res.status(200).json({ message: "Course Registered" })
        }
    }
}

const listCourses = async (req, res) => {
    const courses = await Course.find()
    if (courses.length === 0) {
        res.status(400).json({ message: "No Courses" })
        return;
    }
    res.status(200).json({ courses })
}

const viewRegisteredCourses = async (req, res) => {
    const { register_number } = req.body;
    if (!register_number) {
        res.status(400).json({ message: "Invalid Input" })
        return;
    }
    try {
        const student = await Student.findOne({ regno: register_number }).populate('courses')  // populate() is used to get the details of the courses from the course_id
        res.status(200).json({ courses: student.courses })
    }
    catch (error) {
        res.status(400).json({ message: "Invalid Register Number" })
    }
}

module.exports = {
    signUp,
    login,
    registerCourse,
    listCourses,
    viewRegisteredCourses
}

