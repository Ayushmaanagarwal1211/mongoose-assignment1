const mongoose = require("mongoose")
const clubSchema  = mongoose.Schema({
    name : String,
    description : String
})


module.exports = mongoose.model("club" , clubSchema)