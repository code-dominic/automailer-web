require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const uploadRoutes = require("./routes/uploadRoutes");
const emailRoutes = require("./routes/emailRoutes");
const router = require("./routes/emailRoutes");
const PersonData = require("./models/PersonData.js");

// const userRouter = require("./routes/userRouter")

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.post('/register', async (req, res) => {
  const { email , username , password , appPassword} = req.body;
  console.log(req.body);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({email , username ,  password: hashedPassword , appPassword });
    await user.save();

    const token = jwt.sign({id : user._id} , "1234" , {expiresIn : '1h'});
    
    res.json({ token});
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});



app.post('/login' , async(req,res)=>{
  const { username , password} = req.body;
  console.log(req.body);

  const user = await User.findOne({username} );
  if(!user) return( res.status(400).json({ error : "invalid cridantials"}));

  const isValidPassword = await bcrypt.compare(password , user.password);
  if(!isValidPassword) return res.status(400).json({error : "invalid cridantials"});

  const token = jwt.sign({id : user._id} , "1234" , {expiresIn : '1h'});

  res.json({token});  
  
})

app.get("/emails/data", async (req, res) => {
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
});

app.get('/emails/delete' , async(req,res)=>{
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

});



app.get("/track-click", async (req, res) => {
  try {
    const { personId, emailSentId, redirectUrl } = req.query;

    if (!personId || !emailSentId || !redirectUrl) {
      return res.status(400).send("Invalid tracking link.");
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
    res.redirect(decodeURIComponent(redirectUrl));
  } catch (error) {
    console.error("Tracking error:", error);
    res.status(500).send("Error tracking click");
  }
});







// Routes
// app.use("/" , userRouter);
app.use("/upload", uploadRoutes);
app.use("/emails", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
