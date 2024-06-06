const { Storage } = require('@google-cloud/storage');
const { User } = require('../models/user');
const { gcsKeyPath, gcsProjectId, gcsBucketName } = require('../config/index');
const { addFieldIfTruthy, handleProfilePictureUpdate } = require('../utils');
const path = require('path');

const { Publication } = require('../models/publication');

const storage = new Storage({
    projectId: gcsProjectId,
    keyFilename: path.join(__dirname, `../${gcsKeyPath}`),
});
const bucket = storage.bucket(gcsBucketName);

const getUser = (req, res) => res.json(req.user);

const getUserById = async (req, res) => {
    const { userID } = req.params;
    const user = await User.findById(userID);

    if (!user)
        return res.status(400).json({
            message:
                'Unable to find information about user you are looking for',
        });

    return res.json(user);
};

const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user._id);
        const publications = await Publication.find({ author: req.user._id });

        for (let publication of publications) {
            await publication.deleteOne().exec();
        }

        req.logout((error) => {
            if (error) {
                next(error);
            }

            return res.clearCookie('connect.sid').json(deletedUser);
        });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    const { displayName, bio, phoneNumber } = req.body;
    const updateFields = {};

    addFieldIfTruthy(updateFields, 'displayName', displayName);
    addFieldIfTruthy(updateFields, 'bio', bio);
    addFieldIfTruthy(updateFields, 'phoneNumber', phoneNumber);

    if (req.file) {
        updateFields.picture = await handleProfilePictureUpdate(
            req.user.picture,
            req.file,
            bucket
        );
    }

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

        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            updateFields,
            { new: true }
        );

        return res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = { getUser, getUserById, deleteUser, updateUser };
