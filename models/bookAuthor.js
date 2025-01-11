const mongoose = require("mongoose")


const profileSchema = mongoose.Schema({
    name : {type : String,required:true},
    gender : {type:String, required:true},
    dob  : {type:Date}
})

module.exports = mongoose.model("author" , profileSchema)