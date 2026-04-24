const express = require('express')
const { getUserById, getAllUsers, deleteUsers, changePicture } = require('../controllers/user.controller')
const isAuth = require('../middlewares/passport-setup')
const isAdmin = require("../middlewares/admin");

const {upload} = require("../middlewares/uploadPicture")

const Router = express.Router()


Router.delete('/deleteUser/:userId',isAuth(),isAdmin(),deleteUsers)

//  http://localhost:8000/user/:userId

Router.get('/:userId',isAuth(),isAdmin(),getUserById);

//  http://localhost:8000/user/updatePicture

Router.put('/updatePicture',isAuth(),upload,changePicture);


module.exports = Router