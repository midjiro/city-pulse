const passport = require('passport');
const { hash } = require('bcrypt');
const { User } = require('../models/user');
const { clientAppEndpoint } = require('../config');

class AuthRequests {
    static getAuthGoogle() {
        return passport.authenticate('google', {
            scope: ['email', 'profile'],
        });
    }

    static getAuthCallback() {
        return passport.authenticate('google', {
            successRedirect: clientAppEndpoint,
            failureRedirect: clientAppEndpoint + '/sign-up',
            session: true,
        });
    }

    static async postAuthSignIn(req, res, next) {
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
    }
    static async postAuthSignUp(req, res, next) {
        const { email, password } = req.body;
        const encryptedPassword = await hash(password, 10);

        let user = await User.createIfNotFound({
            provider: 'email',
            email,
            password: encryptedPassword,
        });

        if (!user)
            return res.status(401).json({ message: 'Email already in use' });

        req.login(user, (error) => {
            if (error) {
                next(error);
            }

            return res.json(user);
        });
    }
    static async deleteAuthSignOut(req, res, next) {
        req.logout((error) => {
            if (error) {
                next(error);
            }

            return res.clearCookie('connect.sid').sendStatus(200);
        });
    }
}

module.exports = { AuthRequests };
