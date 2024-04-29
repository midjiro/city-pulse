const { Router } = require('express');
const { isLoggedIn } = require('../utils');
const { PublicationRequests } = require('../requests/publication');
const router = Router();

router.post('/post', isLoggedIn, PublicationRequests.createPost);
router.post('/event', isLoggedIn, PublicationRequests.createEvent);

router.get('/', PublicationRequests.getPublicationList);
router.post('/comment/:publicationID', PublicationRequests.addComment);
router.delete(
    '/comment/:publicationID/:commentID',
    PublicationRequests.deleteComment
);
router.delete(
    '/:publicationID',
    isLoggedIn,
    PublicationRequests.deletePublication
);

module.exports = { publicationRouter: router };
