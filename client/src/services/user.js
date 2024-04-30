import { api } from 'lib/axios';

export const getUser = () => api.get('/user');

export const getUserById = (userID) => api.get('/user/' + userID);

export const updateUser = (update, config) => api.put('/user', update, config);

export const deleteUser = () => api.delete('/user');
