const express = require('express')
const router = express.Router()
const { signUp,userLogin,userLogout,getProducts,addProduct } = require('../controllers/user')
const authentication = require('../middleware/auth')


//User Routes
router.route('/signup').post(signUp)
router.route('/login').post(userLogin)
router.route('/products').post(addProduct).get(authentication,getProducts)
router.route('/logout').get(userLogout)


module.exports = router
