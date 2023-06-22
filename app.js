const express=require('express');
const app=express()
const tasks=require('./routes/tasks')
const connectDB=require('./db/connect')
require('dotenv').config()

app.use(express.json())//this is an inbuilt middleware function and if we dont use it then we wont be able to access the json data sent by user with the help of req.body.
app.use(express.static('./public'))
//routes

app.use('/api/v1/tasks',tasks)


const port=3000

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is running on port ${port}...`)) 
    }catch(error){
        console.log(error)
    }
}

start()
