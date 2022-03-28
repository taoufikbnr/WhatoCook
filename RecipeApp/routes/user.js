const express = require('express')
const { getUserById, getAllUsers, deleteUsers } = require('../controllers/user.controller')
const isAuth = require('../middlewares/passport-setup')
const isAdmin = require("../middlewares/admin");


const Router = express.Router()


Router.delete('/deleteUser/:userId',isAuth(),isAdmin(),deleteUsers)

//  http://localhost:8000/user/:userId

Router.get('/:userId',getUserById);


module.exports = Router