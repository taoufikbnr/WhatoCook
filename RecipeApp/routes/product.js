const express = require("express");
const {addProduct,deleteProduct,getProductById,getAllProducts,updateProduct,} = require("../controllers/product.controller");
const isAuth = require("../middlewares/passport-setup");

const Router = express.Router();

//  http://localhost:8000/product/addProduct
// add product

Router.post("/addProduct", isAuth(), addProduct);

//  http://localhost:8000/product/updateProduct/:idProduct
// update Product
Router.put("/updateProduct/:idProduct", isAuth(), updateProduct);

//  http://localhost:8000/product/deleteProduct/:idProduct
// delete Product

Router.delete("/deleteProduct/:idProduct", isAuth(), deleteProduct);

//  http://localhost:8000/product/products
//getAllProducts
Router.get("/products", getAllProducts);

//  http://localhost:8000/product/:id
// get Product by id

Router.get("/:productId",getProductById);

module.exports = Router;