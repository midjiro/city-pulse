const passport = require('passport');
const { hash } = require('bcrypt');
const { User } = require('../models/user');
const { clientAppEndpoint } = require('../config');

const getAuthGoogle = () =>
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    });

const getAuthCallback = () =>
    passport.authenticate('google', {
        successRedirect: clientAppEndpoint,
        failureRedirect: clientAppEndpoint + '/sign-up',
        session: true,
    });

const signIn = async (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) next(error);

        if (!user) {
            return res.status(401).json({ message: info });
        }

        req.login(user, (error) => {
            if (error) {
                next(error);
            }

            return res.json(user);
        });
    })(req, res, next);
};

const signUp = async (req, res, next) => {
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
            next(error);
        }

        return res.json(user);
    });
};

const signOut = async (req, res, next) => {
    req.logout((error) => {
        if (error) {
            next(error);
        }

        return res.clearCookie('connect.sid').sendStatus(200);
    });
};

module.exports = { signIn, signUp, signOut, getAuthCallback, getAuthGoogle };
