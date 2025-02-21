const mongoose = require("mongoose");



const emailTemplate = new mongoose.Schema({
    subject : {
        type : String,
        require
      },
      greeting : {
        type : String,
        require
      },
      body : {
        type : String,
        require
      },
      buttonLabel :{
        type : String,
        require
      },
      buttonLink : {
        type : String,
        require
      },
      styles : {
        textColor :{
          type : String,
          require
        },
        backgroundColor : {
          type : String,
          require
        },
        buttonColor : {
            type : String,
            require
        },
        buttonTextColor : {
            type : String,
            require
        }
  
      }
});

const EmailTemplate = mongoose.model("EmailTemplate", emailTemplate);
module.exports = EmailTemplate;
