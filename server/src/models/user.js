const { compare } = require('bcrypt');
const { Schema, model } = require('mongoose');

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
    followers: { type: Array },
    following: { type: Array },
});

UserSchema.statics.findOrCreate = async function (id, doc) {
    let user = await User.findById(id);

    if (user) return user;

    user = await User.create({
        _id: doc.id,
        provider: doc.provider,
        displayName: doc.displayName,
        email: doc.email,
        picture: doc.picture,
        password: doc?.password,
    });

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

UserSchema.statics.verifyPassword = async function (
    password,
    encryptedPassword
) {
    const isValid = await compare(password, encryptedPassword);

    return isValid;
};

const User = model('User', UserSchema, 'users');

module.exports = { User };
