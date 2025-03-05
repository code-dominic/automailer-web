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
    // console.log("token:", token);
    const { id } = verifyToken(token);

    const user = await User.findById(id).populate("emailData");

    if (!user || user.emailData.length === 0) {
      return res.status(400).json({ message: "No pending emails to send." });
    }

    const { subject, greeting, body, buttonLabel, buttonLink, styles } = req.body.emailTemplate;

    // Creating a new EmailsSent document
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

    const emailPromises = user.emailData.map(async (emailDoc) => {
      const trackingLink = `http://localhost:5000/track-click?personId=${emailDoc._id}&emailSentId=${emailsSent._id}&redirectUrl=${encodeURIComponent(buttonLink)}`;;
      console.log(trackingLink);
      const mailOptions = {
        from: user.email,
        to: emailDoc.emailId,
        subject,
        html: Template({
          subject,
          greeting,
          body,
          buttonLabel,
          buttonLink: trackingLink,  // Use tracking link instead of actual link
          styles,
          _id: emailDoc._id,
        }),
      };

      try {
        await transporter.sendMail(mailOptions);

        // Update each PersonData document to track the sent email
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

    // Apply bulk updates to PersonData collection
    if (bulkUpdates.length > 0) {
      await PersonData.bulkWrite(bulkUpdates);
    }

    res.status(200).json({ message: "Emails sent and logged successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// exports.saveEmailTemplate = async (req, res) => {
//   try {
//     const { subject, greeting, body, buttonLabel, buttonLink, styles } = req.body.emailTemplate;

//     if (!subject || !greeting || !body || !buttonLabel || !buttonLink || !styles) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newTemplate = new EmailTemplate({ subject, greeting, body, buttonLabel, buttonLink, styles });
//     await newTemplate.save();
//     res.status(201).json({ message: "Template saved!", template: newTemplate });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

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

    res.status(200).json(user.emailData);
  } catch (error) {
    console.error("Error fetching emails:", error);

    if (error.message.includes("Token expired") || error.message.includes("Invalid token")) {
      return res.status(401).json({ message: error.message });
    }

    res.status(500).json({ message: "Internal server error." });
  }
};

exports.trackEmailClick = async (req, res) => async (req, res) => {
  try {
    const { personId, emailSentId } = req.params;
    console.log(personId)

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

    // Redirect to actual link (store this in the database when sending emails)
    const emailRecord = await PersonData.findById(personId);
    const emailData = emailRecord.emailSend.find((e) => e.emailsendRef.toString() === emailSentId);

    if (!emailData) return res.status(404).send("Invalid link");

    res.redirect(emailData.buttonLink); // Redirect to actual video/doc
  } catch (error) {
    console.error("Tracking error:", error);
    res.status(500).send("Error tracking click");
  }
}
