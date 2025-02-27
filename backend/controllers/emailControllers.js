const nodemailer = require("nodemailer");
const PersonData = require("../models/PersonData");
// const EmailTemplate = require("../models/EmailTemplate");
const Template = require("../email-templates/templates");
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const EmailsSent = require('../models/EmailsSent');


const verifyToken = (token) => {
  if (!token) throw new Error("You have to log in to access this resource.");
  return jwt.verify(token, "1234");
};

exports.sendEmails = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    console.log("token:", token);
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
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.verify();

    const bulkUpdates = [];

    const emailPromises = user.emailData.map(async (emailDoc) => {
      const mailOptions = {
        from: process.env.EMAIL,
        to: emailDoc.emailId,
        subject,
        html: Template({ subject, greeting, body, buttonLabel, buttonLink, styles, _id: emailDoc._id }),
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
    const { id } = verifyToken(token);

    const user = await User.findById(id).populate({
      path: "emailData",
      match: req.query.status ? { status: req.query.status } : {}, // Filter at DB level
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    console.log(user.emailData);

    res.status(200).json(user.emailData);
  } catch (error) {
    console.error("Error fetching emails:", error);
    
    const statusCode = error.message.includes("log in") ? 401 : 500;
    res.status(statusCode).json({ message: error.message || "Error fetching emails." });
  }
};


exports.trackEmailClick = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "User ID is required" });

  try {
    await PersonData.findByIdAndUpdate(userId, { clicked: true, clickedAt: new Date() }, { new: true });
    res.send("<h1>Email Click Tracked Successfully!</h1>");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
