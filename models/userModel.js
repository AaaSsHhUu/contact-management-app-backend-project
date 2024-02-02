const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type: String,
        required : [true, "Please enter username"]
    },
    email : {
        type : String,
        required : [true, "Please enter email address"],
        unique : [true, "Email already exists"]
    },
    password : {
        type : String,
        required : [true, "Please enter password for user"]
    }
},{
    timestamps : true
})

module.exports = mongoose.model("User",userSchema);