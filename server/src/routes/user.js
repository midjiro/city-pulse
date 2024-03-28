const { Router } = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const {
    isLoggedIn,
    uploadPicture,
    updateUser,

    deletePicture,
} = require('../utils/utils');
const { User } = require('../models/user');
const { gcsKeyPath, gcsProjectId, gcsBucketName } = require('../../config');

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const storage = new Storage({
    projectId: gcsProjectId,
    keyFilename: gcsKeyPath,
});
const bucket = storage.bucket(gcsBucketName);

router.get('/', isLoggedIn, (req, res) => {
    return res.json(req.user);
});

router.delete('/', isLoggedIn, async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user._id);

        req.logout((error) => {
            if (error) {
                next(error);
            }

            return res.clearCookie('connect.sid').sendStatus(200);
        });
    } catch (error) {
        next(error);
    }
});

router.put(
    '/',
    isLoggedIn,
    upload.single('picture'),
    async (req, res, next) => {
        const { displayName } = req.body;

        if (!req.file && !displayName) return res.sendStatus(400);

        try {
            let user = null;

            if (!req.file) {
                user = await updateUser(req.user._id, { displayName });
            } else {
                if (req.user.picture) {
                    const prevPictureName = req.user.picture.split('/').pop();
                    // Remove previous avatar if exists
                    await deletePicture(prevPictureName, bucket);
                }

                const pictureUrl = await uploadPicture(req.file, bucket);

                user = await updateUser(req.user._id, {
                    picture: pictureUrl,
                    displayName,
                });
            }

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = { userRouter: router };
