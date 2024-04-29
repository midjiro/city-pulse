import { api } from 'requests/index';

export class Publication {
    static getPublicationList() {
        return api.get('/publication/');
    }

    static createPost(post) {
        return api.post('/publication/post', post);
    }

    static createEvent(event) {
        return api.post('/publication/event', event);
    }

    static deletePublication(publicationID) {
        return api.delete(`/publication/${publicationID}`);
    }
}
