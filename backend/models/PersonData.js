const mongoose = require("mongoose");



const personDataSchema = new mongoose.Schema({
    name: {
      type : String,
      required : [true , "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"], // Custom error message
      lowercase: true, // Automatically convert email to lowercase
    },
    status: {
      type: String,
      default: "Pending",
    },
    clicked: { type: Boolean, default: false },
    clickedAt: { type: Date, default: null },
    // emailsSend : {
    //   type : 
    // }
    
});

const PersonData = mongoose.model("PersonData", personDataSchema);
module.exports = PersonData;
