const { Publication } = require('../models/publication');
const { Event } = require('../models/event');
const { getLocationCoordinates } = require('../utils');

class PublicationRequests {
    static async getPublicationList(req, res, next) {
        try {
            let publication = await Publication.find();

            if (publication.length === 0) return res.json(publication);

            publication = await Promise.all(
                publication.map((publication) =>
                    publication.populate(['author', 'comments.by'])
                )
            );

            return res.json(publication);
        } catch (error) {
            next(error);
        }
    }

    static async createPost(req, res, next) {
        try {
            const { title, content } = req.body;
            const postAuthor = req.user._id;

            let post = await Publication.findOrCreate(
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

            post = await post.populate('author');

            return res.json(post);
        } catch (error) {
            next(error);
        }
    }

    static async createEvent(req, res, next) {
        try {
            const { title, content, location, scheduledFor } = req.body;
            const eventAuthor = req.user._id;

            const coords = await getLocationCoordinates(location);

            if (!coords) {
                return res.status(400).json({
                    message: "Unable to find the event's location coordinates.",
                });
            }

            const eventQuery = {
                title,
                'location.lat': coords.lat,
                'location.lng': coords.lng,
                author: eventAuthor,
            };

            const eventData = {
                title,
                content,
                location: { name: location, ...coords },
                scheduledFor,
                author: eventAuthor,
            };

            let event = await Event.findOrCreate(eventQuery, eventData);

            if (!event) {
                return res.status(400).json({
                    message: 'You have previously published similar event.',
                });
            }

            event = await event.populate('author');

            return res.json(event);
        } catch (error) {
            next(error);
        }
    }

    static async addComment(req, res, next) {
        const { publicationID } = req.params;
        const { content } = req.body;
        try {
            let publication = await Publication.findById(publicationID);

            publication = await Publication.findByIdAndUpdate(
                publicationID,
                {
                    comments: [
                        ...publication.comments,
                        { content, by: req.user._id },
                    ],
                },
                { returnOriginal: false }
            );

            publication = await publication.populate(['author', 'comments.by']);

            return res.json(publication);
        } catch (error) {
            next(error);
        }
    }

    static async deleteComment(req, res, next) {
        const { publicationID, commentID } = req.params;

        try {
            let publication = await Publication.findById(publicationID);
            publication = await publication.populate(['author', 'comments.by']);

            const filteredComments = publication.comments.filter((comment) => {
                if (comment.by._id !== req.user._id)
                    return res.status(401).json({
                        message: 'Only authors can delete their comments.',
                    });

                return comment._id.toString() !== commentID;
            });

            publication = await Publication.findByIdAndUpdate(
                publicationID,
                {
                    comments: filteredComments,
                },
                { returnOriginal: false }
            );

            return res.json(publication);
        } catch (error) {
            next(error);
        }
    }

    static async deletePublication(req, res, next) {
        const { publicationID } = req.params;

        try {
            const publication = await Publication.findById(publicationID);

            if (publication.author.localeCompare(req.user._id) !== 0) {
                return res.status(401).json({
                    message: 'Only authors can delete their publications.',
                });
            }

            await Publication.findByIdAndDelete(publicationID);

            return res.json({ publicationID });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { PublicationRequests };
