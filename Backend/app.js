require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require('./db/connect')
const userRouter = require('./routes/user')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/v1/',userRouter)

app.get('/',(req,res)=>{
    res.send('working')
})
const Port = process.env.PORT || 3001

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(Port,()=>{
            console.log(`server running at port ${Port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()