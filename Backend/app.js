require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require('./db/connect')
const userRouter = require('./routes/user')
const cookieParser = require('cookie-parser')

app.use(cors({credentials:true,origin: 'http://localhost:3000'}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

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