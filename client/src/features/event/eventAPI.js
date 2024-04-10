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
