const express = require("express")
const router = express.Router();
const {
    login,
    createCourse,
    deleteCourse
} = require('../controllers/admin')
const verifyToken = require('../middlewares/verify')


router.post('/login', login)
router.post('/courses', verifyToken, createCourse)

router.delete('/courses', verifyToken, deleteCourse);

module.exports = router;