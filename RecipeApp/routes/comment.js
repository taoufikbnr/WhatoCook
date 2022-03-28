const express = require('express')
const { addComment, getComments, deleteCommentById } = require('../controllers/comment.controller')
const isAuth = require("../middlewares/passport-setup");
const isAdmin = require("../middlewares/admin");


const Router = express.Router()

Router.post('/addComment/:productId',isAuth(),addComment)

//  http://localhost:8000/comment/getComments

Router.get('/getComments',isAuth(),getComments)

//  http://localhost:8000/comment/:commenttId

Router.delete('/:commentId',isAuth(),isAdmin(),deleteCommentById)

module.exports = Router