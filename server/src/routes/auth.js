const { Router } = require('express');
const { isLoggedIn, isCredentialsProvided } = require('../utils');
const { AuthRequests } = require('../requests/auth');

const router = Router();

router.get('/google', AuthRequests.getAuthGoogle());

router.get('/callback', AuthRequests.getAuthCallback());

router.post('/sign-in', isCredentialsProvided, AuthRequests.postAuthSignIn);

router.post('/sign-up', isCredentialsProvided, AuthRequests.postAuthSignUp);

router.delete('/sign-out', isLoggedIn, AuthRequests.deleteAuthSignOut);

module.exports = { authRouter: router };
