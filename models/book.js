const mongoose = require("mongoose")


const mongooseSchema = mongoose.Schema({
    title : {
        type : String, 
        required : true
    }, 
    author : {type:mongoose.Schema.Types.ObjectId, ref:"author", required:true}, 
    publishDate : { 
        type : String,
        default : Date.now
    },
    genres : {
        type : [String],
        default  : []
    } ,
    price : {type : Number,required:true}

})


module.exports = mongoose.model("book" , mongooseSchema)