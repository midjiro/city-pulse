import { createAsyncThunk } from '@reduxjs/toolkit';
import { Publication } from 'requests/publication';

export const getPublicationList = createAsyncThunk(
    'publication/get',
    async (_, { rejectWithValue }) => {
        try {
            return await Publication.getPublicationList();
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const createPost = createAsyncThunk(
    'publication/create',
    async (publication, { rejectWithValue }) => {
        try {
            return await Publication.createPost(publication);
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const createEvent = createAsyncThunk(
    'publication/create',
    async (event, { rejectWithValue }) => {
        try {
            return await Publication.createEvent(event);
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const deletePublication = createAsyncThunk(
    'publication/delete',
    async (publicationID, { rejectWithValue }) => {
        try {
            return await Publication.deletePublication(publicationID);
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);
