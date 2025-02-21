require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const session = require('express-session')
const passport = require('passport');
const localStrategy = require("passport-local");
const User = require('./models/User');


const uploadRoutes = require("./routes/uploadRoutes");
const emailRoutes = require("./routes/emailRoutes");

const userRouter = require("./routes/userRouter")

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// Routes
app.use("/" , userRouter);
app.use("/upload", uploadRoutes);
app.use("/emails", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
