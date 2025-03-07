const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email : {
    type : String,
    require : true,
    unique : true
  },
  username : {
    type : String,
    require : true,
    unique : true
  },
  password : {
    type : String,
    require : true
  },
  appPassword :{
    type : String,
    require : true
  },
  emailData : [{
    type : mongoose.Schema.Types.ObjectId , 
    ref : 'PersonData'
  }],
  defaultEmailTemp : {
    subject : {
      type : String,
      default: 'Welcome to AutoMailer!'
    },
    greeting : {
      type : String,
      default : "Hello [User's Name],"
    },
    body : {
      type : String,
      default : "We are thrilled to have you on board! To get started, click the button below:"
    },
    buttonLabel :{
      type : String,
      default : "click Here!!"
    },
    buttonLink : {
      type : String,
      default : "https://helloworld.com"
    },
    styles : {
        backgroundColor :{ type : String , default : "#15B346"},
        textColor : { type : String , default : "#000000"},
        buttonColor : {type : String  , default : "#15B346"},
        buttonTextColor : { type : String  , default : "#000000"}
    }
  }
});


module.exports = mongoose.model("User" , UserSchema);