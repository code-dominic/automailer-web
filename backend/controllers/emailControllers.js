const nodemailer = require("nodemailer");
const PersonData = require("../models/PersonData");
const EmailTemplate = require("../models/EmailTemplate");
const Template = require("../email-templates/templates");



module.exports.sendEmails = async (req, res) => {
    try {
      // Validate custom message
      console.log(req.body);
      const { subject, greeting, body, buttonLabel, buttonLink, styles } = req.body.emailTemplate;
  
  
      // Find emails with "Pending" status
      const emails = await PersonData.find();
  
      if (emails.length === 0) {
        return res.status(400).json({ message: "No pending emails to send." });
      }
  
      // Configure nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail", // Change if using another service
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      // Send emails
      const emailPromises = emails.map(async (emailDoc) => {
        const mailOptions = {
          from: process.env.EMAIL,
          to: emailDoc.email,
          html: Template({subject, greeting, body, buttonLabel, buttonLink , styles , _id : emailDoc._id} ),
        };
  
        try {
          const emailResponse = await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${emailDoc.email}:`, emailResponse.response);
          emailDoc.status = "Sent"; // Update status to "Sent"
          await emailDoc.save();
        } catch (error) {
          console.error(`Error sending email to ${emailDoc.email}:`, error);
          emailDoc.status = "Failed"; // Update status to "Failed"s
          await emailDoc.save();
        }
      });
  
      await Promise.all(emailPromises); // Wait for all email promises to resolve
  
      res.status(200).json({ message: "Emails sent successfully!" });
    } catch (error) {
      console.error("Error sending emails:", error);
      res.status(500).json({ message: "Failed to send emails." });
    }
  }


module.exports.saveEmailTemplate = async (req, res) => {
    try {
        const {
            subject,
            greeting,
            body,
            buttonLabel,
            buttonLink,
            styles
        } = req.body.emailTemplate;
        // Ensure required fields are present
        if (!subject || !greeting || !body || !buttonLabel || !buttonLink || !styles) {
            return res.status(400).json({ message: "All fields are required" });
        }
  
        // Create a new template
        const newTemplate = new EmailTemplate({
            subject,
            greeting,
            body,
            buttonLabel,
            buttonLink,
            styles
        });
  
        // Save the template to the database
        await newTemplate.save();
  
        res.status(201).json({ message: "Email template saved successfully", template: newTemplate });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
  }


  module.exports.getEmails =  async (req, res) => {
    console.log(req.query); // Debugging: Log the query parameters
    try {
      let persons; // Declare the variable outside the if-else blocks
  
      if (req.query.emails === 'All emails') {
        persons = await PersonData.find(); // Retrieve all emails from the database
      } else if (req.query.emails === 'Sent mail') {
        persons = await PersonData.find({ status: 'Sent' });
      } else if (req.query.emails === 'Pending') {
        persons = await PersonData.find({ status: 'Pending' });
      } else if (req.query.emails === 'Responded') {
        persons = await PersonData.find({ clicked: true });
      } else if (req.query.emails === 'Unresponded') {
        persons = await PersonData.find({ clicked: false }); // Fixed typo: 'flase' -> 'false'
      } else {
        // If the query parameter is invalid, return a 400 Bad Request
        return res.status(400).json({ message: "Invalid query parameter" });
      }
  
      // Send the emails as a response
      res.status(200).json(persons);
    } catch (error) {
      console.error("Error fetching emails:", error);
      res.status(500).json({ message: "Failed to fetch emails" });
    }
  }


module.exports.trackEmailClick = async (req, res) => {
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    try {
      // Update the database to mark the email as clicked
      await PersonData.findOneAndUpdate(
        { _id : userId },
        { clicked: true, clickedAt: new Date() },
        { upsert: true, new: true }
      );
  
      res.send("<h1>Email Click Tracked Successfully!</h1>");
    } catch (error) {
      console.error("Error tracking email click:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  


