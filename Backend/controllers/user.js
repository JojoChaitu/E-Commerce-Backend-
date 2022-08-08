const User = require('../modal/User')


const signUp = async (req,res) => {
    const user = await User.create({...req.body})
    console.log(req.body)
    res.status(201).json({user})
}

module.exports = { signUp }