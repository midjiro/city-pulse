const { Router } = require('express');
const { isLoggedIn } = require('../utils');
const { PostRequests } = require('../requests/post');

const router = Router();

router.get('/', PostRequests.getPostList);

router.get('/:postID', PostRequests.getPostById);

router.post('/', isLoggedIn, PostRequests.createPost);

router.put('/:postID', isLoggedIn, PostRequests.updatePost);

router.delete('/:postID', isLoggedIn, PostRequests.deletePost);

module.exports = { postRouter: router };
