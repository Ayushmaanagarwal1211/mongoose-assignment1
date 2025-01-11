const mongoose = require("mongoose")


const profileSchema = mongoose.Schema({
    name : String,
    borrowedBooks : {
        type : [{type : mongoose.Schema.Types.ObjectId, ref :"borrowedBooks"}],
        default : []
    },
    role : String,
    email : String,
    password : String
})

module.exports = mongoose.model("userprofile" , profileSchema)