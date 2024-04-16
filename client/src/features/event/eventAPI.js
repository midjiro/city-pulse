import { createAsyncThunk } from '@reduxjs/toolkit';
import { Event } from 'requests/event';

export const getEventList = createAsyncThunk(
    'event/get',
    async (_, { rejectWithValue }) => {
        try {
            return await Event.getEventList();
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const createEvent = createAsyncThunk(
    'event/create',
    async (event, { rejectWithValue }) => {
        try {
            return await Event.createEvent(event);
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const deleteEvent = createAsyncThunk(
    'post/delete',
    async (eventID, { rejectWithValue }) => {
        try {
            return await Event.deleteEvent(eventID);
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);
