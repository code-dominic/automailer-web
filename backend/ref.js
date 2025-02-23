change this:require("dotenv").config();
const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const Email = require('./models/Emails');
const Template = require('./email-templates/templates');
// const emails

const app = express();
app.use(cors());
app.use(express.json());



mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));



const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(
      csvParser({
        headers: true, // Treat the first row as headers
        skipLines: 0,  // Skip no lines; start from the top
        mapHeaders: ({ header }) => header.trim() // Trim header names
      })
    )
    .on("data", (data) => {
      console.log("Row:", data); // Log each row to debug the CSV parsing
      results.push(data);
    })
    .on("end", async () => {
      try {
        console.log("Parsed Results:", results);

        // Normalize the field name to match your schema
        const emails = results.map((row) => {
          const normalizedEmail = row.Email || row.email || row._0; // Handle variations
          return {
            email: normalizedEmail ? normalizedEmail.trim() : undefined, // Trim extra spaces
            status: "Pending",
          };
        });

        console.log("Emails to Insert (Before Validation):", emails);

        // Filter valid email objects
        const validEmails = emails.filter((emailObj) => emailObj.email && emailObj.email.toLowerCase() !== "email"); // Remove undefined emails
        console.log("Valid Emails to Insert:", validEmails);

        if (validEmails.length === 0) {
          return res.status(400).json({ message: "No valid email addresses found in the file." });
        }

        // Insert into MongoDB
        await Email.insertMany(validEmails);

        res.status(200).json({ message: "CSV uploaded and emails saved successfully!" });
      } catch (error) {
        console.error("Error inserting emails:", error);
        res.status(500).json({ message: "Failed to save emails to MongoDB" });
      }
    })
    .on("error", (err) => {
      console.error("Error processing CSV:", err);
      res.status(500).json({ message: "Error processing file" });
    });
});





app.post("/send-emails", async (req, res) => {
  try {
    // Validate custom message
    console.log(req.body);
    const { subject, greeting, body, buttonLabel, buttonLink, styles } = req.body.emailTemplate;


    // Validate subject and message
    // if (!subject || subject.trim() === "" || !message || message.trim() === "") {
    //   return res.status(400).json({ message: "Subject and message are required." });
    // }

    // Find emails with "Pending" status
    const emails = await Email.find();

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
        html: Template({subject, greeting, body, buttonLabel, buttonLink , styles} ),
      };

      try {
        const emailResponse = await transporter.sendMail(mailOptions);
        console.log(Email sent to ${emailDoc.email}:, emailResponse.response);
        emailDoc.status = "Sent"; // Update status to "Sent"
        await emailDoc.save();
      } catch (error) {
        console.error(Error sending email to ${emailDoc.email}:, error);
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
});





app.get("/emails", async (req, res) => {
  try {
    const emails = await Email.find(); // Retrieve all emails from the database
    res.status(200).json(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ message: "Failed to fetch emails" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));