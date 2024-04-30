const { Router } = require('express');
const { isLoggedIn } = require('../utils');
const {
    createPost,
    createEvent,
    getPublicationList,
    addComment,
    deleteComment,
    deletePublication,
} = require('../services');
const router = Router();

router.post('/post', isLoggedIn, createPost);
router.post('/event', isLoggedIn, createEvent);

router.get('/', getPublicationList);
router.post('/comment/:publicationID', addComment);
router.delete('/comment/:publicationID/:commentID', deleteComment);
router.delete('/:publicationID', isLoggedIn, deletePublication);

module.exports = { publicationRouter: router };
