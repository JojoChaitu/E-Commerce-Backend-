const  mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'user name missing'],
    },
    image:{
        type:String,
        required:[true,'image is  missing']
    },
    description:{
        type:String
    },
    price:{
        type:Number
    }
})

module.exports = mongoose.model('Product',productSchema)