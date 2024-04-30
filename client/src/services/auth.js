import { api } from 'lib/axios';

export const signIn = (credentials) => api.post('/auth/sign-in', credentials);

export const signUp = (credentials) => api.post('/auth/sign-up', credentials);

export const signOut = () => api.delete('/auth/sign-out');
