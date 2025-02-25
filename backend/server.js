require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const uploadRoutes = require("./routes/uploadRoutes");
const emailRoutes = require("./routes/emailRoutes");

// const userRouter = require("./routes/userRouter")

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.post('/register', async (req, res) => {
  const { email , username , password} = req.body;
  console.log(req.body);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({email , username ,  password: hashedPassword });
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




// Routes
// app.use("/" , userRouter);
app.use("/upload", uploadRoutes);
app.use("/emails", emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
