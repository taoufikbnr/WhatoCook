const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

  
  firstname: String,
  lastname:String,
  email: String,
  password: String,
  picture:[],

  role: {
    type: String,
    enum: ["admin", "client"],
    default: "client",
  },
  products : [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Product'
  }]
});

module.exports = mongoose.model("User", userSchema);
