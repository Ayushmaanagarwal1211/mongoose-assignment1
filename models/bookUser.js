const mongoose = require("mongoose")


const profileSchema = mongoose.Schema({
    name : {type:String, required:true},
    borrowedBooks : {
        type : [{type : mongoose.Schema.Types.ObjectId, ref :"borrowedBooks"}],
        default : []
    },
    role : {type:String, default : "user"},
    email : {type:String, required:true},
    password : {type:String, required:true}
})

module.exports = mongoose.model("userprofile" , profileSchema)