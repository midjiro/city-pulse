const { Router } = require('express');
const { isLoggedIn, isCredentialsProvided } = require('../utils');
const {
    getAuthGoogle,
    getAuthCallback,
    signIn,
    signUp,
    signOut,
} = require('../services');

const router = Router();

router.get('/google', getAuthGoogle());

router.get('/callback', getAuthCallback());

router.post('/sign-in', isCredentialsProvided, signIn);

router.post('/sign-up', isCredentialsProvided, signUp);

router.delete('/sign-out', isLoggedIn, signOut);

module.exports = { authRouter: router };
