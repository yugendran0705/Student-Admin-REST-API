const express = require("express")
const router = express.Router();
const {
    login,
    createCourse,
    verifyTokenAdmin,
    addStudentRegistration,
    removeStudentRegistration,
    deleteCourse
} = require('../controllers/admin')


router.post('/login', login)
router.post('/courses', verifyTokenAdmin, createCourse)

router.patch('/courses', verifyTokenAdmin, addStudentRegistration)
router.patch('/removecourses', verifyTokenAdmin, removeStudentRegistration)

router.delete('/courses', verifyTokenAdmin, deleteCourse);

module.exports = router;