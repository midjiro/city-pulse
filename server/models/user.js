const { compare } = require('bcrypt');
const { Schema, model } = require('mongoose');

const {
    getTransporter,
    generateMailOptions,
} = require('../services/nodemailer');

const UserSchema = new Schema({
    _id: {
        type: String,
    },
    provider: {
        type: String,
        required: true,
    },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String },
    password: { type: String, required: false },
    bio: { type: String, maxLength: 150 },
    phoneNumber: { type: String, maxLength: 20 },
});

UserSchema.statics.findOrCreate = async function (
    query,
    doc,
    nodemailerUser,
    nodemailerPass
) {
    let user = await User.findOne(query);

    if (user) return user;

    user = await User.create({
        _id: doc.id,
        provider: doc.provider,
        displayName: doc.displayName ? doc.displayName : `User${Date.now()}`,
        email: doc.email,
        picture: doc.picture,
        password: doc?.password,
    });

    const transporter = getTransporter(nodemailerUser, nodemailerPass);

    await transporter.sendMail(generateMailOptions(user));

    return user;
};

UserSchema.statics.createIfNotFound = async function (doc) {
    let user = doc.id
        ? await User.findById(doc.id)
        : await User.findOne({ email: doc.email });

    if (user) return;

    user = await User.create({
        _id: doc.id ? doc.id : Date.now().toString(),
        provider: doc.provider,
        displayName: doc.displayName ? doc.displayName : `User${Date.now()}`,
        email: doc.email,
        picture: doc.picture,
        password: doc?.password,
    });

    return user;
};

UserSchema.statics.isDisplayNameUsed = async function (
    currentUser,
    displayName
) {
    const duplicates = await User.find({ displayName });
    if (duplicates.length > 1) return true;
    else if (duplicates.length === 1) {
        return currentUser._id !== duplicates[0]._id;
    }

    return false;
};

UserSchema.statics.verifyPassword = async function (
    password,
    encryptedPassword
) {
    const isValid = await compare(password, encryptedPassword);

    return isValid;
};

const User = model('User', UserSchema, 'users');

module.exports = { User };
