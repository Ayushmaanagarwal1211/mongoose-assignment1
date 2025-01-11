const mongoose = require("mongoose")
const grades  = mongoose.Schema({
    course : String,
    score : Number,
    maxScore : Number, 
    date : {
        type:Date,
        default : Date.now()
    }
})

const profileSchema = mongoose.Schema({
    bio : String,
    contact : String,
    address : String
})


const mongooseSchema = mongoose.Schema({
    name : {
        type : String, 
        required : true
    }, 
    gpa : Number, 
    courses : { 
        type : [String],
        default : ["Maths"]
    },
    age : Number ,
    grades : {
        type : [grades],
        default : []
    },
    profile : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "profile"
    }

})


module.exports = mongoose.model("mystudent" , mongooseSchema)