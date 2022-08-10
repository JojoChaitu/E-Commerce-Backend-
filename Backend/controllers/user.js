const User = require('../modal/User')
const Product = require('../modal/Product')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Sign Up
const signUp = async (req,res) => {
        const { name,email,password } = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        const token = jwt.sign({userId:user._id,name:user.name},process.env.JWT_SECRET,{ expiresIn:process.env.JWT_LIFETIME})
        res.cookie("jwt",token)
        res.status(201).json({user:{name:user.name},token})
}

//Login
const userLogin = async (req,res) => {
    const { email,password } = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(401).send('Invalid creadentails')
    }
    const result = await bcrypt.compare(password,user.password)

    if(!result){
        return res.status(401).send('Invalid password')
    }
    console.log('user login Succesful');
    const token = jwt.sign({userId:user._id,name:user.name},process.env.JWT_SECRET,{ expiresIn:process.env.JWT_LIFETIME})   
    // localStorage.setItem("jwt",JSON.stringify(res.data.token))
    res.status(202).cookie("jwt",token, {
        sameSite:'strict',
        path:'/',
         httpOnly:true
         })
    res.status(200).json({user:{name:user.name},token})
}
//Logout
const userLogout = (req,res) => {
        res.cookie('jwt','').send('logged out')
    }

//Products
const addProduct = async (req,res) => {
    const product = await Product.create({...req.body})
    res.send(product)
}

const getProducts = async (req,res) => {
    const products = await Product.find({})
    res.status(200).send({products})
}



module.exports = { signUp,userLogin,getProducts,userLogout,addProduct }