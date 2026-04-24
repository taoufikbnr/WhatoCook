const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    text:{
        type:String,
        required:true
    },
    

})

module.exports = mongoose.model('Comment',commentSchema)