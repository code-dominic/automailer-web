const nodemailer = require("nodemailer");
const PersonData = require("../models/PersonData");
// const EmailTemplate = require("../models/EmailTemplate");
const Template = require("../email-templates/templates");
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const EmailsSent = require('../models/EmailsSent');


const verifyToken = (token) => {
  try {
    if (!token) {
      throw new Error("Token missing. Please log in.");
    }
    return jwt.verify(token, "1234"); // Replace with your secret key
  } catch (error) {
    console.error("JWT Verification Error:", error); // Log the actual error

    if (error.name === "TokenExpiredError") {
      throw new Error("Token expired. Please log in again.");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Invalid token. Please log in again.");
    } else {
      throw new Error("Authentication failed.");
    }
  }
};


exports.sendEmails = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const { id } = verifyToken(token);

    const ids = req.body.ids;

    const user = await User.findById(id).populate("emailData");

    if (!user || user.emailData.length === 0) {
      return res.status(400).json({ message: "No pending emails to send." });
    }

    // ✅ Filter only selected IDs
    const filteredEmailData = user.emailData.filter(emailDoc =>
      ids.includes(emailDoc._id.toString())
    );

    if (filteredEmailData.length === 0) {
      return res.status(400).json({ message: "No matching emails found for the selected IDs." });
    }

    const { subject, greeting, body, buttonLabel, buttonLink, styles } = req.body.emailTemplate;

    // Create a new EmailsSent document
    const emailsSent = new EmailsSent({
      subject,
      greeting,
      body,
      buttonLabel,
      buttonLink,
      styles,
    });
    await emailsSent.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user.email,
        pass: user.appPassword,
      },
    });

    await transporter.verify();

    const bulkUpdates = [];

    // ✅ Loop through only filteredEmailData
    const emailPromises = filteredEmailData.map(async (emailDoc) => {
      // const trackingLink = `${process.env.BACKEND_URL}emails/track-click?personId=${emailDoc._id}&emailSentId=${emailsSent._id}&redirectUrl=${encodeURIComponent(buttonLink)}`;
      const trackingLink = `${process.env.BACKEND_URL}emails/track-click?personId=${emailDoc._id}&emailSentId=${emailsSent._id}&redirectLink=${encodeURIComponent(buttonLink)}`;
      console.log

      const newGreeting = greeting.replace("[User's Name]", emailDoc.name);

      const mailOptions = {
        from: user.email,
        to: emailDoc.emailId,
        subject,
        html: Template({
          subject,
          greeting: newGreeting,
          body,
          buttonLabel,
          buttonLink: trackingLink,
          styles,
          _id: emailDoc._id,
        }),
      };

      try {
        await transporter.sendMail(mailOptions);

        // ✅ Use emailDoc._id, not filteredEmailData._id
        bulkUpdates.push({
          updateOne: {
            filter: { _id: emailDoc._id },
            update: {
              $push: {
                emailSend: {
                  emailsendRef: emailsSent._id,
                  status: "sent",
                  clicked: false,
                  clickedAt: null,
                },
              },
            },
          },
        });
      } catch (error) {
        console.error(`Error sending email to ${emailDoc.emailId}:`, error);
      }
    });

    await Promise.all(emailPromises);

    if (bulkUpdates.length > 0) {
      await PersonData.bulkWrite(bulkUpdates);
    }

    res.status(200).json({ message: "Emails sent and logged successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};




exports.saveEmailTemplate = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Token missing. Please log in." });
    }

    const { id } = verifyToken(token);
    const { subject, greeting, body, buttonLabel, buttonLink, styles } = req.body.emailTemplate;

    console.log("greeting : " , greeting);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          "defaultEmailTemp.subject": subject,
          "defaultEmailTemp.greeting": greeting,
          "defaultEmailTemp.body": body,
          "defaultEmailTemp.buttonLabel": buttonLabel,
          "defaultEmailTemp.buttonLink": buttonLink,
          "defaultEmailTemp.styles": styles,
        },
      },
      { new: true } // Return updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Email template updated successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error saving email template:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getEmails = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({ message: "Token missing. Please log in." });

    const { id } = verifyToken(token);

    const user = await User.findById(id).populate({
      path: "emailData",
      match: req.query.status ? { status: req.query.status } : {},
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({emails : user.emailData , username : user.username , defaultEmailTemp : user.defaultEmailTemp});
  } catch (error) {
    console.error("Error fetching emails:", error);

    if (error.message.includes("Token expired") || error.message.includes("Invalid token")) {
      return res.status(401).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error." });
  }
};

exports.trackEmailClick = async (req, res) => {
  try {
    console.log("hitting route");
    const { personId, emailSentId, redirectLink } = req.query;

    if (!personId || !emailSentId || !redirectLink) {
      return res.status(400).send("Invalid tracking link..");
    }

    // Update click tracking in the database
    await PersonData.updateOne(
      { _id: personId, "emailSend.emailsendRef": emailSentId },
      {
        $set: {
          "emailSend.$.clicked": true,
          "emailSend.$.clickedAt": new Date(),
        },
      }
    );

    // Redirect the user to the actual destination
    res.redirect(decodeURIComponent(redirectLink));
  } catch (error) {
    console.error("Tracking error:", error);
    res.status(500).send("Error tracking click");
  }
}

exports.getData = async (req, res) => {
  try {
      const { id } = req.query;
      if (!id) {
          return res.status(400).json({ error: "ID is required" });
      }

      console.log("Fetching data for ID:", id);

      const personData = await PersonData.findById(id)
          .populate({
              path: "emailSend.emailsendRef",  // ✅ Corrected
          })
          .exec();

      console.log("After population:", JSON.stringify(personData, null, 2)); // Debug output

      if (!personData) {
          return res.status(404).json({ error: "Person not found" });
      }

      res.json(personData);
  } catch (error) {
      console.error("Error fetching person data:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteData = async(req,res)=>{
  try{
    const {id } = req.query;
    
    const deletedPerson = await PersonData.findByIdAndDelete(id);

    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found" });
    }

    await User.updateMany(
      { emailData: id }, // Find users with this reference
      { $pull: { emailData: id } } // Remove reference from array
  );

  res.json({ message: "PersonData deleted and reference removed from User." });
} catch (error) {
  console.error("Error deleting PersonData:", error);
  res.status(500).json({ message: "Server error" });
}

};