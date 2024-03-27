const { Router } = require('express');
const { isLoggedIn } = require('../utils/utils');
const { User } = require('../models/user');

const router = Router();

router.get('/', isLoggedIn, (req, res) => {
    return res.json(req.user);
});

router.delete('/', isLoggedIn, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);

        req.logout((error) => {
            if (error) {
                console.error(error);
                return res.sendStatus(500);
            }

            return res.clearCookie('connect.sid').sendStatus(200);
        });
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
});

module.exports = { userRouter: router };
