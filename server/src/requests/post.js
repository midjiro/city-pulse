const { Post } = require('../models/post');

class PostRequests {
    static async getPostList(req, res, next) {
        try {
            const posts = await Post.find();

            if (posts.length === 0) {
                return res
                    .status(400)
                    .json({ message: 'There are nothing yet published.' });
            }

            return res.json(posts);
        } catch (error) {
            next(error);
        }
    }

    static async getPostById(req, res, next) {
        try {
            const { postID } = req.params;
            const post = await Post.findById(postID);

            if (!post) {
                return res
                    .status(400)
                    .json({ message: 'Unable to find this post.' });
            }

            return res.json(post);
        } catch (error) {
            next(error);
        }
    }

    static async createPost(req, res, next) {
        try {
            const { title, content } = req.body;
            const postAuthor = req.user._id;

            let post = await Post.findOrCreate(
                { title, author: postAuthor },
                {
                    title,
                    content,
                    author: postAuthor,
                }
            );

            if (!post) {
                return res.status(400).json({
                    message: 'You have previously published similar post.',
                });
            }

            return res.json(post);
        } catch (error) {
            next(error);
        }
    }

    static async updatePost(req, res, next) {
        const { postID } = req.params;

        try {
            let post = await Post.findById(postID);

            if (post.author.localeCompare(req.user._id) !== 0) {
                return res.status(401).json({
                    message: 'Only authors can edit their publications.',
                });
            }

            post = await Post.findByIdAndUpdate(postID, req.body, {
                returnOriginal: false,
            });

            return res.json(post);
        } catch (error) {
            next(error);
        }
    }

    static async deletePost(req, res, next) {
        const { postID } = req.params;

        try {
            const post = await Post.findById(postID);

            if (post.author.localeCompare(req.user._id) !== 0) {
                return res.status(401).json({
                    message: 'Only authors can delete their publications.',
                });
            }

            await Post.findByIdAndDelete(postID);

            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { PostRequests };
