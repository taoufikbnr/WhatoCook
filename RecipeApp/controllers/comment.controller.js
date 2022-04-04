const Comments = require("../models/Comments")
const Product = require("../models/Product")
const User = require("../models/User")


exports.addComment = async (req,res)=>{
    const newComment = await new Comments({userId:req.user._id,productId:req.params.productId,...req.body})   
    try {
        const comment = await newComment.save()

        const product = await Product.findById(req.params.productId);

        product.comments = [...product.comments,newComment._id]
        
        await product.save()
        
        res.status(203).json({msg:"Comment added ",comment,product})
    } catch (error) {
        res.status(403).json({ errors: [{ msg: "Failed to add comment" }] });
    }
}

exports.getComments = async(req,res)=>{

    try {
        const comments = await Comments.find()
        
        res.status(201).json({msg:"Comments successfully",comments})
    } catch (error) {
        res.status(401).json({errors:[{msg:"Failed to find comments"}]})
    }
}

exports.deleteCommentById = async ( req,res)=>{

    try {
        await Comments.findByIdAndDelete(req.params.commentId)
        res.status(202).json({msg:"comment deleted successfuly"})
    } catch (error) {
        res.status(403).json({errors:[{msg:"Access Denied"}]})
    }
}