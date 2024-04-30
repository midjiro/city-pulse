import { api } from 'lib/axios';

export const getPublicationList = () => api.get('/publication/');

export const createPost = (post) => api.post('/publication/post', post);

export const createEvent = (event) => api.post('/publication/event', event);

export const deletePublication = (publicationID) =>
    api.delete(`/publication/${publicationID}`);
