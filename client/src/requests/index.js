import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
    withCredentials: true,
});

api.interceptors.response.use(
    (res) => {
        return res.data;
    },
    (error) => {
        const { response } = error;
        if (response.status !== 500) {
            throw Promise.reject(response.data.message);
        }

        return Promise.reject(error);
    }
);
