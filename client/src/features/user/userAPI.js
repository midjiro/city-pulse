import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signIn = createAsyncThunk('user/sign-in', async (credentials) => {
    try {
        const res = await axios.post(
            process.env.REACT_APP_SERVER_ENDPOINT + '/auth/sign-in',
            credentials,
            { withCredentials: true }
        );

        return res.data;
    } catch (error) {
        const { response } = error;
        if (response.status !== 500) {
            throw new Error(response.data.message);
        }
    }
});

export const signUp = createAsyncThunk(
    'user/sign-up',

    async (credentials) => {
        try {
            const res = await axios.post(
                process.env.REACT_APP_SERVER_ENDPOINT + '/auth/sign-up',
                credentials,
                { withCredentials: true }
            );

            return res.data;
        } catch (error) {
            const { response } = error;
            if (response.status !== 500) throw new Error(response.data.message);
        }
    }
);

export const initializeGoogleAuth = () => {
    window.open(
        process.env.REACT_APP_SERVER_ENDPOINT + '/auth/google',
        '_self'
    );
};

export const handleGoogleAuth = createAsyncThunk('user/sign-in', async () => {
    try {
        const res = await axios.get(
            process.env.REACT_APP_SERVER_ENDPOINT + '/user',
            {
                withCredentials: true,
            }
        );

        return res.data;
    } catch (error) {
        const { response } = error;
        if (response && response?.status !== 401) {
            console.error(error);
            throw new Error(error);
        }
    }
});

export const signOut = createAsyncThunk('user/sign-out', async () => {
    try {
        const res = await axios.delete(
            process.env.REACT_APP_SERVER_ENDPOINT + '/auth/sign-out',
            {
                withCredentials: true,
            }
        );

        return res.json();
    } catch (error) {
        const { response } = error;
        if (response && response.status !== 401) {
            console.error(error);
            throw new Error(error);
        }
    }
});

export const removeAccount = createAsyncThunk('user/sign-out', async () => {
    try {
        const res = await axios.delete(
            process.env.REACT_APP_SERVER_ENDPOINT + '/user',
            {
                withCredentials: true,
            }
        );

        return res.json();
    } catch (error) {
        const { response } = error;
        if (response && response.status !== 401) {
            console.error(error);
            throw new Error(error);
        }
    }
});
