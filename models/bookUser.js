const mongoose = require("mongoose")
const book  = mongoose.Schema({
    book : {
        type : mongoose.Schema.Types.ObjectId,
        ref   : "book"
    },
    issueDate : {
        type:String,
        default : Date.now
    },
    dueDate : {
        type:String,
        default : Date.now    
    },
    returnDate : {
        type:String
    }
})
const profileSchema = mongoose.Schema({
    name : String,
borrowedBooks :{
    type :  [book],
default  : []}
})

module.exports = mongoose.model("userprofile" , profileSchema)