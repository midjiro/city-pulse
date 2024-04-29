const { Schema, model } = require('mongoose');

const PublicationSchema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true, maxLength: 1500 },
        publishedAt: { type: Date, default: Date.now() },
        author: { type: String, ref: 'User', required: true },
        comments: [{ content: String, by: { type: String, ref: 'User' } }],
    },
    { collection: 'publications', discriminatorKey: '_type' }
);

PublicationSchema.statics.findOrCreate = async function (query, doc) {
    let publication = await Publication.findOne(query);

    if (publication) return;

    publication = await Publication.create(doc);

    return publication;
};

const Publication = model('Publication', PublicationSchema, 'publications');

module.exports = { PublicationSchema, Publication };
