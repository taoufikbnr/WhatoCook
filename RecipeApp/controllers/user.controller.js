const Product = require("../models/Product");
const User = require("../models/User");

exports.getUserById = async (req, res) => {
  
  try {
    const userexist = await User.findById(req.params.userId)
    if(!userexist) return res.status(404).json({msg:"User doesnt exist"})

    const user = await User.findById(req.params.userId).populate("products");
   
   res.status(200).json({msg:"found user", user });
  } catch (error) {
    res.status(400).json({ errors: [{ msg: "Get user failed" }] });
  }
}


exports.getAllUsers = async (req, res) => {

    try {
        const users = await User.find();

         res.status(200).json({ msg: "Found all users" , users})
        
    } catch (error) {
      res.status(401).json({ errors: [{ msg: "Wrong page" }] });
    }
  };

  exports.deleteUsers = async (req,res)=>{

    const user = await User.findOne({ _id: req.params.userId} );
      try {
        
        if(user.role === "admin") return res.status(403).json({msg:"Cant delete an admin "})
        await User.findByIdAndDelete({_id:req.params.userId})
        await Product.deleteMany({userId:req.params.userId})
        res.status(201).json({msg:"deleted"})
        

      } catch (error) {
        res.status(401).json({ errors: [{ msg: "Not authorized" }] });
      
  }
}

exports.changePicture = async (req,res)=>{

  try {
    
        const user = await User.findOne({ _id: req.user._id} );

     if(req.user._id.equals(user._id)){
      await User.findByIdAndUpdate({_id:req.user._id},{$set:{photo:req.file.filename}})

     }
    res.status(203).json({ msg: "Profile picture updated" });

  } catch (error) {
    res.status(402).json({errors:[{msg:"failed to upload"}]})
  }
}
