const express = require('express')
const router = express.Router()
const { signUp } = require('../controllers/user')


//User Routes
router.route('/signup').post(signUp)


module.exports = router
