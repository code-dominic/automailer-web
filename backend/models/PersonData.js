const mongoose = require("mongoose");

const personDataSchema = new mongoose.Schema({
    emailId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    emailSend: [{
        emailsendRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EmailsSent"  // ✅ Ensure this matches the actual model name
        },
        status: {
            type: String,
            enum: ["sent", "failed", "delivered"]
        },
        clicked: {
            type: Boolean,
            default: false
        },
        clickedAt: {
            type: Date,
            default: null
        }
    }]
});

const PersonData = mongoose.model("PersonData", personDataSchema);
module.exports = PersonData;
