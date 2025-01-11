const mongoose = require("mongoose")


const mongooseSchema = mongoose.Schema({
    title : {
        type : String, 
        required : true
    }, 
    author : {type:mongoose.Schema.Types.ObjectId, ref:"author"}, 
    publishDate : { 
        type : String,
        default : Date.now
    },
    genres : {
        type : [String]
    } ,
    price : Number

})


module.exports = mongoose.model("book" , mongooseSchema)