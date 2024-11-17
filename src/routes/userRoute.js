const express = require('express')
const { signup, login, logout } = require('../controllers/userController')
const {auth} = require('../config/auth')
const router = express.Router()


router.get('/',(req, res) => {
    return res.status(200).json({
        success: true,
        message:"runnig well baby"
    })
})
router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/auth', auth, (req, res) => {
    return res.status(200).json({
        success:true,
        message:"authorized"
    })
})


module.exports = router