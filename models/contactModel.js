const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    name : {
        type : String,
        required : [true,"Please Enter contact name"]
    },
    email : {
        type : String,
        required : [true,"Please Enter contact email address"]
    },
    phone : {
        type : String,
        required : [true,"Please Enter contact phone number"]
    },
},
{
    timestamps : true, 
    // This option, when set to true in a Mongoose schema, automatically adds two fields to your documents: createdAt and updatedAt. These fields store timestamps representing when the document was created and when it was last modified, respectively.
}
)

module.exports = mongoose.model("Contact",contactSchema)