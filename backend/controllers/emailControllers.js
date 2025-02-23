const nodemailer = require("nodemailer");
const PersonData = require("../models/PersonData");
// const EmailTemplate = require("../models/EmailTemplate");
const Template = require("../email-templates/templates");

exports.sendEmails = async (req, res) => {
  try {
    const { subject, greeting, body, buttonLabel, buttonLink, styles } = req.body.emailTemplate;
    const emails = await PersonData.find();
    console.log(emails);

    if (emails.length === 0) {
      return res.status(400).json({ message: "No pending emails to send." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const emailPromises = emails.map(async (emailDoc) => {
      const mailOptions = {
        from: process.env.EMAIL,
        to: emailDoc.email,
        html: Template({ subject, greeting, body, buttonLabel, buttonLink, styles, _id: emailDoc._id }),
      };

      try {
        await transporter.sendMail(mailOptions);
        emailDoc.status = "Sent";
        await emailDoc.save();
      } catch (error) {
        console.error(`Error sending email to ${emailDoc.email}:`, error);
        emailDoc.status = "Failed";
        await emailDoc.save();
      }
    });

    await Promise.all(emailPromises);
    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ message: "Failed to send emails." });
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
    let query = {};
    if (req.query.status) query.status = req.query.status;
    const emails = await PersonData.find(query);
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).json({ message: "Error fetching emails" });
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
