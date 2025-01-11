const mongoose = require("mongoose")


const profileSchema = mongoose.Schema({
    name : String,
    borrowedBooks : {
        type : [{type : mongoose.Schema.Types.ObjectId, ref :"borrowedBooks"}],
        default : []
    }
})

module.exports = mongoose.model("author" , profileSchema)