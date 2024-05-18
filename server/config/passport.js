const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { User } = require('../models/user');

const authenticateWithEmailAndPassword = async (email, password, done) => {
    try {
        const currentUser = await User.findOne({
            email,
            provider: 'email',
        });

        if (!currentUser)
            return done(
                null,
                false,
                'Unable to find an account with given email.'
            );

        const isSamePassword = await User.verifyPassword(
            password,
            currentUser.password
        );

        if (!isSamePassword) return done(null, false, 'Invalid password.');

        return done(null, currentUser);
    } catch (error) {
        return done(error);
    }
};

// Antilab 2: No unused parameters
const authenticateWithGoogle = async (
    accessToken,
    refreshToken,
    profile,
    done,
    nodemailerUser,
    nodemailerPass
) => {
    try {
        const currentUser = await User.findOrCreate(
            { _id: profile.id },
            profile,
            nodemailerUser,
            nodemailerPass
        );

        return done(null, currentUser);
    } catch (error) {
        return done(error);
    }
};

const initPassport = (
    passport,
    clientID,
    clientSecret,
    nodemailerUser,
    nodemailerPass
) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
            },
            authenticateWithEmailAndPassword
        )
    );
    passport.use(
        new GoogleStrategy(
            {
                clientID,
                clientSecret,
                callbackURL: 'auth/callback',
            },
            (...args) => {
                authenticateWithGoogle(...args, nodemailerUser, nodemailerPass);
            }
        )
    );

    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
};

module.exports = {
    initPassport,
};
