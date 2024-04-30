import { createAsyncThunk } from '@reduxjs/toolkit';
import * as services from 'services';
export const getPublicationList = createAsyncThunk(
    'publication/get',
    async (_, { rejectWithValue }) => {
        try {
            return await services.getPublicationList();
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const createPost = createAsyncThunk(
    'publication/create',
    async (publication, { rejectWithValue }) => {
        try {
            return await services.createPost(publication);
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const createEvent = createAsyncThunk(
    'publication/create',
    async (event, { rejectWithValue }) => {
        try {
            return await services.createEvent(event);
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const deletePublication = createAsyncThunk(
    'publication/delete',
    async (publicationID, { rejectWithValue }) => {
        try {
            return await services.deletePublication(publicationID);
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);
