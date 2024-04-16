import { api } from 'requests/index';

export class Event {
    static getEventList() {
        return api.get('/event');
    }

    static createEvent(event) {
        return api.post('/event', event);
    }

    static deleteEvent(eventID) {
        return api.delete(`/event/${eventID}`);
    }
}
