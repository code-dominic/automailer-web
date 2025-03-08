const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.userLogin = async (req, res) => {
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
};


exports.userRegister = async(req,res)=>{
    const { username , password} = req.body;
    console.log(req.body);
  
    const user = await User.findOne({username} );
    if(!user) return( res.status(400).json({ error : "invalid cridantials"}));
  
    const isValidPassword = await bcrypt.compare(password , user.password);
    if(!isValidPassword) return res.status(400).json({error : "invalid cridantials"});
  
    const token = jwt.sign({id : user._id} , "1234" , {expiresIn : '1h'});
  
    res.json({token});  
    
  }

