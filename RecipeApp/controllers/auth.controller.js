const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


exports.userRegister = async (req, res) => {
  const newUser = await new User({ ...req.body });
  const email = req.body.email;
  
  try {
    const user = await User.findOne({ email });
    if (user)
    return res.status(402).json({ errors: [{ msg: `User already exist` }] });
const password = newUser.password

    let  salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password,salt)
    
    newUser.password = hash
    

    const payload = {
      id:newUser._id,
      firstname:newUser.firstname,
      lastname:newUser.lastname,
      email:newUser.email,
    }
    const token = await jwt.sign(payload,process.env.secretOrPrivateKey)

    await newUser.save();

    
    res.status(200).json({ msg: `Register user success`,token:`Bearer ${token}` });
  } catch (error) {
    res.status(400).json({ errors: [{ msg: `Register user failed` }] });
  }
};

exports.userLogin = async (req,res)=>{
  const {email,password} = req.body
  const user = await User.findOne({email})
  
  try {
    if(!user) return res.status(403).json({msg:"Bad credentials"})
    
    const isMatch = await bcrypt.compare(password,user.password) 
    
    if(!isMatch) return res.status(403).json({msg:"Bad credentials"})
    
        const payload = {
          id:user._id,
          firstname:user.firstname,
          lastname:user.lastname,
          email:user.email,
          
        }
    
        const token = await jwt.sign(payload,process.env.secretOrPrivateKey)
    
        res.status(203).json({token:`Bearer ${token}`})
    
  } catch (error) {
    res.status(400).json({msg:"failed",error:error})
  }
}
