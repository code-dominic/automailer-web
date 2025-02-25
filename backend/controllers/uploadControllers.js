const fs = require("fs");
const csvParser = require("csv-parser");
const PersonData = require("../models/PersonData");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.uploadCSV = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "You have to log in to upload!" });
  }

  let user;
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || "1234"); // Use environment variable
    console.log("Verified User ID:", verified.id);

    user = await User.findById(verified.id);
    if (!user) return res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.log("Uploaded File:", req.file);

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csvParser({ headers: true, mapHeaders: ({ header }) => header.trim().toLowerCase() }))
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        console.log("CSV Data:", results);
        console.log("CSV Headers:", Object.keys(results[0] || {}));

        const persons = results.map((row) => ({
            name: row.name || row["name"] || row["_1"] || "Unknown",
            emailId: row.email || row["email"] || row["email address"] || row["_0"]
          }))
          .filter((p) => p.emailId && p.emailId.toLowerCase() !== "email");

        if (persons.length === 0) {
          return res.status(400).json({ message: "No valid entries found." });
        }

        console.log("persone data" , persons);

        // **✅ FIX: Batch Insert & Save User Once**
        const insertedEmails = await PersonData.insertMany(persons);
        user.emailData.push(...insertedEmails.map(email => email._id));
        await user.save(); // Save only once

        // Optional: Delete the uploaded file after processing
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });

        res.status(200).json({ message: "Data saved successfully!" });
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ message: "Failed to save data." });
      }
    });
};
