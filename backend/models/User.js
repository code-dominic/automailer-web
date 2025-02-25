const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

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
  emailData : [{
    type : mongoose.Schema.Types.ObjectId , 
    ref : 'PersonData'
  }]
});


module.exports = mongoose.model("User" , UserSchema);