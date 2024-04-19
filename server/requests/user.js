const { Storage } = require('@google-cloud/storage');
const { User } = require('../models/user');
const { gcsKeyPath, gcsProjectId, gcsBucketName } = require('../config/index');
const { uploadPicture, deletePicture } = require('../utils/index');
const { Post } = require('../models/post');

const storage = new Storage({
    projectId: gcsProjectId,
    keyFilename: gcsKeyPath,
});
const bucket = storage.bucket(gcsBucketName);

class UserRequests {
    static getUser(req, res) {
        return res.json(req.user);
    }

    static async getUserById(req, res) {
        const { userID } = req.params;
        const user = await User.findById(userID);

        if (!user)
            return res
                .status(400)
                .json({
                    message:
                        'Unable to find information about user you are looking for',
                });

        return res.json(user);
    }

    static async deleteUser(req, res, next) {
        try {
            await User.findByIdAndDelete(req.user._id);
            const posts = await Post.find({ author: req.user._id });

            for (let post of posts) {
                await post.deleteOne().exec();
            }

            req.logout((error) => {
                if (error) {
                    next(error);
                }

                return res.clearCookie('connect.sid').sendStatus(200);
            });
        } catch (error) {
            next(error);
        }
    }

    static async putUser(req, res, next) {
        const { displayName } = req.body;

        if (!req.file && !displayName) return res.sendStatus(400);
        try {
            const isDisplayNameUsed = await User.isDisplayNameUsed(
                req.user,
                displayName
            );

            if (isDisplayNameUsed) {
                return res
                    .status(400)
                    .json({ message: 'Username is already taken.' });
            }

            let user = null;

            if (!req.file) {
                user = await User.findByIdAndUpdate(
                    req.user._id,
                    { displayName },
                    { returnOriginal: false }
                );
            } else {
                if (req.user.picture) {
                    const prevPictureName = req.user.picture.split('/').pop();
                    // Remove previous avatar if exists
                    await deletePicture(prevPictureName, bucket);
                }

                const pictureUrl = await uploadPicture(req.file, bucket);

                user = await User.findByIdAndUpdate(
                    req.user._id,
                    {
                        picture: pictureUrl,
                        displayName,
                    },
                    {
                        returnOriginal: false,
                    }
                );
            }

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { UserRequests };
