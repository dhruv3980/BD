const express = require('express');
const router = express.Router();

// import controller

const {commentController} = require('../controllers/commentControllers');
const {postController, fetchAllPost} = require('../controllers/postControllers');
const {likeController,unlikeController} = require('../controllers/likeControllers')
 

// mapping
router.post('/comments/create', commentController)
router.post('/posts/create', postController)
router.get('/posts', fetchAllPost)
router.post('/likes/like',likeController)
router.post('/likes/unlike',unlikeController)

// exports route

module.exports = router