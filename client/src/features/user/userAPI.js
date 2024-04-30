import { createAsyncThunk } from '@reduxjs/toolkit';
import * as services from 'services';

export const signIn = createAsyncThunk(
    'user/sign-in',
    async (credentials, { rejectWithValue }) => {
        try {
            return await services.signIn(credentials);
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const signUp = createAsyncThunk(
    'user/sign-up',
    async (credentials, { rejectWithValue }) => {
        try {
            return await services.signUp(credentials);
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const initializeGoogleAuth = () => {
    window.open(
        process.env.REACT_APP_SERVER_ENDPOINT + '/auth/google',
        '_self'
    );
};

export const autoLogin = createAsyncThunk(
    'user/sign-in',
    async (_, { rejectWithValue }) => {
        try {
            return await services.getUser();
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const signOut = createAsyncThunk(
    'user/sign-out',
    async (_, { rejectWithValue }) => {
        try {
            return await services.signOut();
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const removeAccount = createAsyncThunk(
    'user/remove',
    async (_, { rejectWithValue }) => {
        try {
            return await services.deleteUser();
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const updateAccountInformation = createAsyncThunk(
    'user/update',
    async (newAccountInformation, { rejectWithValue }) => {
        try {
            return await services.updateUser(newAccountInformation, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);
