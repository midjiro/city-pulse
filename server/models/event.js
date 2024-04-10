const { Schema, model } = require('mongoose');

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        maxLength: 1500,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    author: { type: String, ref: 'User', required: true },
    location: {
        type: String,
        required: true,
    },
});

EventSchema.statics.findOrCreate = async function (query, doc) {
    let event = await Event.findOne(query);

    if (event) return;

    event = await Event.create(doc);

    return event;
};

const Event = model('Event', EventSchema, 'events');

module.exports = { Event };
