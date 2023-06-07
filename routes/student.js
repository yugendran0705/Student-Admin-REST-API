const express = require("express")
const router = express.Router();
const {
    signUp,
    login,
    registerCourse,
    listCourses,
    viewRegisteredCourses,
} = require("../controllers/student")
const { verifyTokenStudent } = require('../middlewares/verify')

router.post('/signup', signUp)
router.post('/login', login)
router.post('/courses', verifyTokenStudent, registerCourse)

router.get('/courses', verifyTokenStudent, listCourses)
router.get('/registeredcourses', verifyTokenStudent, viewRegisteredCourses)

module.exports = router;