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

export const addComment = createAsyncThunk(
    'publication/addComment',
    async ({ publicationID, comment }, { rejectWithValue }) => {
        try {
            return await services.addComment(publicationID, comment);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteComment = createAsyncThunk(
    'publication/deleteComment',
    async ({ publicationID, commentID }, { rejectWithValue }) => {
        try {
            return await services.deleteComment(publicationID, commentID);
        } catch (error) {
            return rejectWithValue(error);
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
