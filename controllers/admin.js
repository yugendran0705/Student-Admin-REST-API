const { encryptPassword, checkPassword } = require("../utils/encrypt-decrypt")
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Course = require('../models/Course');
const Admin = require('../models/Admin');
const { JWT_SECRET_KEY_ADMIN } = require('../config/dotenv');

const signup = async (req, res) => {
    const { id, password, role, name } = req.body;
    if (!id || !password || !role || !name) {
        res.status(400).json({ message: "Invalid Input" })
        return;
    }
    try {
        password_hash = encryptPassword(password)
        const response = await Admin.create({
            admin_id: id,
            password: password_hash,
            role: role,
            name: name
        });
        res.status(201).json({ message: "Admin Created" })
    }
    catch (error) {
        res.status(409).json({ message: "Admin already exists" });
    }
}

const login = async (req, res) => {
    const { id, password, role } = req.body
    if (!id || !password || !role) {
        res.status(400).json({ message: "Invalid Input" })
        return;
    }
    try {
        const admin = await Admin.findOne({ admin_id: id });
        if (!admin || admin.role !== role) {
            res.status(404).json({ message: "Admin not found" })
            return;
        }
    }
    catch (error) {
        res.status(404).json({ message: "Admin not found" })
        return;
    }
    const flag = checkPassword(String(admin.password), String(password))
    if (flag) {
        const token = jwt.sign({ id, role }, JWT_SECRET_KEY_ADMIN, { expiresIn: '1h' });
        res.status(200).json({ message: "Admin Logged In", token })
    }
    else {
        res.status(401).json({ message: "Invalid Password" })
    }
}

const createCourse = async (req, res) => {
    const { courseName, courseCode, capacity, role } = req.body;
    if (!courseName || !courseCode || !capacity || !role) {
        res.status(400).json({ message: "Invalid Input" })
        return;
    }
    if (role !== "admin") {
        res.status(401).json({ message: "Unauthorized" })
        return;
    }
    else {
        try {
            const response = await Course.create({
                courseName,
                courseCode,
                capacity: parseInt(capacity),
            });
            res.status(201).json({ message: "Course Created" })
        }
        catch (error) {
            res.status(409).json({ message: "Course already exists" });
        }
    }
}

const deleteCourse = async (req, res) => {
    const { courseCode, courseName, role } = req.body;
    if (!courseCode || !courseName || !role) {
        res.status(400).json({ message: "Invalid Input" })
        return;
    }
    if (role !== "admin") {
        res.status(401).json({ message: "Unauthorized" })
        return;
    }
    else {
        try {
            const course = await Course.findOne({ courseCode: courseCode });
            if (!course) {
                res.status(404).json({ message: "Course not found" })
            }
            await Course.deleteOne({ courseCode: req.body.courseCode, courseName: req.body.courseName });
            res.status(200).json({ message: "Course Deleted" })
        }
        catch (error) {
            res.status(404).json({ message: "Course not found" })
        }
    }
}

module.exports = {
    signup,
    login,
    createCourse,
    deleteCourse
}