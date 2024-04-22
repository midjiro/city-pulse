const { Schema, model } = require('mongoose');
const { differenceInDays } = require('date-fns');

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
        name: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
});

EventSchema.statics.findOrCreate = async function (query, doc) {
    let event = await Event.findOne(query);

    if (event && differenceInDays(doc.date, event.date) <= 1) return;

    event = await Event.create(doc);

    return event;
};

const Event = model('Event', EventSchema, 'events');

module.exports = { Event };
