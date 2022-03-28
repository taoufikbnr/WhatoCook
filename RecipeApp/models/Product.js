const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    name : String,
    ingredient: {
        type: Array,
        // ing: ["egg","batata"],
      }, 
       photo: {
        type: String
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    
    date:{
      type:String,
      default:Date.now()}
      ,

})

module.exports = mongoose.model('Product',productSchema)

