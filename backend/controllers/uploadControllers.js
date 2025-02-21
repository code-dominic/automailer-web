const fs = require("fs");
const csvParser = require("csv-parser");
const PersonData = require("../models/PersonData");

const uploadCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csvParser({ headers: true, mapHeaders: ({ header }) => header.trim().toLowerCase() }))
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        const persons = results.map((row) => ({
          name: row.name || "Unknown",
          email: row.email || row["e-mail"] || row["Email Address"],
          status: "Pending",
        })).filter((p) => p.email && p.email.toLowerCase() !== "email");

        if (persons.length === 0) {
          return res.status(400).json({ message: "No valid entries found." });
        }

        await PersonData.insertMany(persons);
        res.status(200).json({ message: "Data saved successfully!" });
      } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ message: "Failed to save data." });
      }
    });
};

module.exports = { uploadCSV }; // Ensure it's properly exported
