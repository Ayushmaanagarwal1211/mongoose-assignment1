const mongoose = require("mongoose")


const mongooseSchema = mongoose.Schema({
    name : {
        type : String, 
        required : true
    }, 
    
})


module.exports = mongoose.model("profile" , mongooseSchema)