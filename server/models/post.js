const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true, maxLength: 1500 },
    publishedAt: { type: Date, default: Date.now() },
    author: { type: String, ref: 'User', required: true },
    comments: [{ content: String, by: String }],
    likedBy: [String],
});

PostSchema.statics.findOrCreate = async function (query, doc) {
    let post = await Post.findOne(query);

    if (post) return;

    post = await Post.create(doc);

    return post;
};

const Post = model('Post', PostSchema, 'posts');

module.exports = { Post };
