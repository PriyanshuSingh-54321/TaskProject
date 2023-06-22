const mongoose=require('mongoose')


const TaskSchema=new mongoose.Schema({//only the properties that we set in our schema will get passed to our database,rest will not be passed.
    name:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
        maxlength:[20,'name cannot be more than 20 characters'],
    },
    completed:{
        type:Boolean,
        default:false,
    },
})


module.exports=mongoose.model('Task',TaskSchema)  