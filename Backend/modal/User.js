const  mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'user name missing'],
    },
    email:{
        type:String,
        required:[true,'user email is  missing'],
        unique:[true,'email must be unique'],
    },
    password:{
        type:String,
        required:[true,"password is missing"],
    }
})

module.exports = mongoose.model('User',userSchema)