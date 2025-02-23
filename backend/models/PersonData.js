const mongoose = require("mongoose");



const personDataSchema = new mongoose.Schema({
    emailId : {
      type : String,
      require : true
    },
    name : {
      type : String,
      require : true
    },
    emailSend : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'EmailsSent'
    }]
    
});

const PersonData = mongoose.model("PersonData", personDataSchema);
module.exports = PersonData;
