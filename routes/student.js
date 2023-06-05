const express = require("express")
const router = express.Router();
const {
    signUp,
    login,
    registerCourse,
    listCourses,
    viewRegisteredCourses,
    verifyTokenStudent
} = require("../controllers/student")

router.post('/signup', signUp)
router.post('/login', login)
router.post('/courses', verifyTokenStudent, registerCourse)

router.get('/courses', verifyTokenStudent, listCourses)
router.get('/registeredcourses', verifyTokenStudent, viewRegisteredCourses)

module.exports = router;