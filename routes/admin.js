const express = require("express")
const router = express.Router();
const {
    signup,
    login,
    createCourse,
    deleteCourse
} = require('../controllers/admin')
const { verifyTokenAdmin } = require('../middlewares/verify')

router.post('/signup', signup)
router.post('/login', login)
router.post('/courses', verifyTokenAdmin, createCourse)

router.delete('/courses', verifyTokenAdmin, deleteCourse);

module.exports = router;