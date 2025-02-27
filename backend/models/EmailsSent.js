const mongoose = require("mongoose");

const EmailsSentSchema = new mongoose.Schema({
    //subject, greeting, body, buttonLabel, buttonLink,styles 
    subject : String,
    greeting : String,
    body : String,
    ButtonLable : String,
    styles : {
        backgroundColor :{ type : String},
        textColor : { type : String},
        buttonColor : {type : String },
        buttonTextColor : { type : String }
    }
})



const EmailsSent = mongoose.model("EmailsSent", EmailsSentSchema);
module.exports = EmailsSent;