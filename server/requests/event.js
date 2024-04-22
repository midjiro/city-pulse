const { Event } = require('../models/event');
const { getLocationCoordinates } = require('../utils');

class EventRequests {
    static async getEventList(req, res, next) {
        try {
            let events = await Event.find();

            if (events.length === 0) return res.json(events);

            events = await Promise.all(
                events.map((event) => event.populate('author'))
            );

            return res.json(events);
        } catch (error) {
            next(error);
        }
    }

    static async getEventById(req, res, next) {
        try {
            const { eventID } = req.params;
            const event = await Event.findById(eventID);

            if (!event) {
                return res
                    .status(400)
                    .json({ message: 'Unable to find this event.' });
            }

            return res.json(event);
        } catch (error) {
            next(error);
        }
    }

    static async createEvent(req, res, next) {
        try {
            const { title, content, location, date } = req.body;
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
                date,
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

    static async updateEvent(req, res, next) {
        const { eventID } = req.params;

        try {
            let event = await Event.findById(eventID);

            if (event.author.localeCompare(req.user._id) !== 0) {
                return res.status(401).json({
                    message: 'Only authors can edit their publications.',
                });
            }

            event = await Event.findByIdAndUpdate(eventID, req.body, {
                returnOriginal: false,
            });

            return res.json(event);
        } catch (error) {
            next(error);
        }
    }

    static async deleteEvent(req, res, next) {
        const { eventID } = req.params;

        try {
            const event = await Event.findById(eventID);

            if (event.author.localeCompare(req.user._id) !== 0) {
                return res.status(401).json({
                    message: 'Only authors can delete their publications.',
                });
            }

            await Event.findByIdAndDelete(eventID);

            return res.json({ eventID });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = { EventRequests };
