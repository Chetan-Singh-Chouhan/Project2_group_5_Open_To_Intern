const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        requred:true,
        unique:true
    },
    collegeId:{
        type:ObjectID,
        ref:'collegeData',
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})


module.exports=mongoose.model('internData',internSchema)