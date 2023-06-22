const mongoose=require('mongoose')



const connectDB=(url)=>{
    return mongoose.connect(url,
        {useNewUrlParser: true,//we do this to remove depreciation error
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true,
        } )

}


module.exports=connectDB