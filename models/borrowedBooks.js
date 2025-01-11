const mongoose = require("mongoose")
const borrowedBooks  = mongoose.Schema({
    book : {
        type : mongoose.Schema.Types.ObjectId,
        ref   : "book",
        required : true
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


module.exports = mongoose.model("borrowedBooks" , borrowedBooks)