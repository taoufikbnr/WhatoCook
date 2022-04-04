const express = require('express')
const isAuth = require("../middlewares/passport-setup");
const isAdmin = require("../middlewares/admin");
const { deleteProduct, deleteProductByAdmin } = require('../controllers/product.controller');
const { getAllUsers } = require('../controllers/user.controller');


const Router = express.Router()

//  http://localhost:8000/root/deleteProduct/:idProduct

Router.delete("/deleteProduct/:idProduct", isAuth(),isAdmin(), deleteProductByAdmin);


//  http://localhost:8000/root/getUsers

Router.get('/getUsers',isAuth(),isAdmin(),getAllUsers)


module.exports = Router

