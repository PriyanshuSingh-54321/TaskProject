const express=require('express');
const app=express()
const tasks=require('./routes/tasks')
const connectDB=require('./db/connect')
require('dotenv').config()
 const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')


//extra security packages
const helmet=require('helmet')
const cors=require('cors')
const xss=require('xss-clean')
const rateLimiter=require('express-rate-limit')


app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json())//this is an inbuilt middleware function and if we dont use it then we wont be able to access the json data sent by user with the help of req.body.
app.use(express.static('./public'))
app.use(helmet())
app.use(cors())
app.use(xss())


//routes

app.use('/api/v1/tasks',tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port= process.env.PORT || 3000

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>
        console.log(`server is running on port ${port}...`)) 
    }catch(error){
        console.log(error)
    }
}

start()
