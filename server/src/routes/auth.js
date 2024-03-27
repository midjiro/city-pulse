const passport = require('passport');
const { hash } = require('bcrypt');
const { Router } = require('express');
const { User } = require('../models/user');
const { isLoggedIn, isCredentialsProvided } = require('../utils/utils');
const { clientAppEndpoint } = require('../../config');

const router = Router();

router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    })
);

router.get(
    '/callback',
    passport.authenticate('google', {
        successRedirect: clientAppEndpoint,
        failureRedirect: clientAppEndpoint + '/sign-up',
        session: true,
    })
);

router.post('/sign-in', isCredentialsProvided, (req, res, next) => {
    passport.authenticate('local', (_, user, info) => {
        if (!user) {
            return res.status(401).json({ message: info });
        }

        req.login(user, (error) => {
            if (error) {
                console.error(error);
                return res.sendStatus(500);
            }

            return res.json(user);
        });
    })(req, res, next);
});

router.post('/sign-up', isCredentialsProvided, async (req, res) => {
    const { email, password } = req.body;
    const encryptedPassword = await hash(password, 10);

    let user = await User.createIfNotFound({
        provider: 'email',
        email,
        password: encryptedPassword,
    });

    if (!user) return res.status(401).json({ message: 'Email already in use' });

    req.login(user, (error) => {
        if (error) {
            console.error(error);
            return res.sendStatus(500);
        }

        return res.json(user);
    });
});

router.delete('/sign-out', isLoggedIn, (req, res) => {
    req.logout((error) => {
        if (error) {
            console.error(error);
            return res.sendStatus(500);
        }

        return res.clearCookie('connect.sid').sendStatus(200);
    });
});

module.exports = { authRouter: router };
