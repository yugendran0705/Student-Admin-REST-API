const express = require("express")
const router = express.Router();
const {
    signUp,
    login,
    registerCourse,
    listCourses,
    viewRegisteredCourses,
} = require("../controllers/student")
const verifyToken = require('../middlewares/verify')

router.post('/signup', signUp)
router.post('/login', login)
router.post('/courses', verifyToken, registerCourse)

router.get('/courses', verifyToken, listCourses)
router.get('/registeredcourses', verifyToken, viewRegisteredCourses)

module.exports = router;