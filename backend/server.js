require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");


const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require("./routes/uploadRoutes");
const emailRoutes = require("./routes/emailRoutes");




const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();


app.use("/upload", uploadRoutes);
app.use("/emails", emailRoutes);
app.use('/user' , userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
