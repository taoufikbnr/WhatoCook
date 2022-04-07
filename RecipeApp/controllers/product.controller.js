const Product = require("../models/Product");
const User = require("../models/User");



exports.addProduct = async (req, res) => {
 
      const newProduct = new Product({userId: req.user._id,...req.body,photo:req.file});
      
  try {
    const product = await newProduct.save();

    const user = await User.findOne({ _id: req.user._id });

    user.products = [...user.products, newProduct._id];

    await user.save();

    res.status(203).json({ msg: "Product added successfully", product, user });
  } catch (error) {
    res.status(403).json({ errors: [{ msg: "Failed to add the product" }] });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.idProduct });
    if(req.user.role === "admin") {
       await Product.findByIdAndDelete({_id: req.params.idProduct,});
       res.status(203).json({ msg: "Product deleted by admin" });
  }  else {
    if (req.user._id.equals(product.userId)) {

      await Product.findByIdAndDelete({_id: req.params.idProduct,});

      res.status(203).json({ msg: "Product deleted successfully" });
    }}
  } catch (error) {
    res.status(402).json({ errors: [{ msg: "Delete product failed" }] });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('comments');
    res.status(200).json({ msg: "Fetch recipe successfully", product });

  } catch (error) {

    res.status(400).json({ msg: "Can't find recipe" });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json({ msg: "Fetch products with success", allProducts });

  } catch (error) {
    
    res.status(401).json({ errors: [{ msg: "Can't find the recipes" }] });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.idProduct);

    if (req.user._id.equals(product.userId)) {
      await Product.findByIdAndUpdate({ _id: req.params.idProduct },{ $set: {...req.body} }
      );

      res.status(203).json({ msg: "Recipe updated with success" });
    }
  } catch (error) {
    res.status(402).json({ errors: [{ msg: "Update product failed" }] });
  }
};

///////////ADMIN

exports.deleteProductByAdmin = async (req, res) => {
  try {
      await Product.findByIdAndDelete({_id: req.params.idProduct,});

      res.status(203).json({ msg: "Product deleted successfully" });
    
  } catch (error) {
    res.status(402).json({ errors: [{ msg: "Delete product failed" }] });
  }
};