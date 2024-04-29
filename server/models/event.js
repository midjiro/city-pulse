const { model } = require('mongoose');
const { differenceInDays } = require('date-fns');
const extend = require('mongoose-extend-schema');
const { PublicationSchema } = require('./publication');

const EventSchema = extend(PublicationSchema, {
    scheduledFor: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    location: {
        name: { type: String, required: true },
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
});

EventSchema.statics.findOrCreate = async function (query, doc) {
    let event = await Event.findOne(query);

    if (event && differenceInDays(doc.scheduledFor, event.scheduledFor) <= 1)
        return;

    event = await Event.create(doc);

    return event;
};

const Event = model('Event', EventSchema, 'publications');

module.exports = { Event };
