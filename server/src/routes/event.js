const { Router } = require('express');
const { isLoggedIn } = require('../utils');
const { EventRequests } = require('../requests/event');

const router = Router();

router.get('/', EventRequests.getEventList);

router.get('/:eventID', EventRequests.getEventById);

router.post('/', isLoggedIn, EventRequests.createEvent);

router.put('/:eventID', isLoggedIn, EventRequests.updateEvent);

router.delete('/:eventID', isLoggedIn, EventRequests.deleteEvent);

module.exports = { eventRouter: router };
