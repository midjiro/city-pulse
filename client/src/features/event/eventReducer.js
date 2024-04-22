import { createSlice } from '@reduxjs/toolkit';
import { createEvent, deleteEvent, getEventList } from './eventAPI';
import { checkActionType } from 'features/utils';
import { removeAccount } from 'features/user/userAPI';

const eventReducer = createSlice({
    name: 'event',
    initialState: {
        events: [],
        error: null,
        pending: false,
    },
    extraReducers: (build) => {
        build
            .addCase(getEventList.fulfilled, (state, action) => {
                state.events = action.payload;
                state.pending = false;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.events.push(action.payload);
                state.error = null;
                state.pending = false;
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                const { eventID } = action.payload;

                state.events = state.events.filter(
                    (event) => event._id !== eventID
                );
                state.pending = false;
            })
            .addCase(removeAccount.fulfilled, (state, action) => {
                const { author } = action.payload;

                state.events = state.events.filter(
                    (event) => event.author._id !== author._id
                );
            })
            .addMatcher(
                (action) => checkActionType(action, 'event', 'pending'),
                (state) => {
                    state.pending = true;
                }
            )
            .addMatcher(
                (action) => checkActionType(action, 'event', 'rejected'),
                (state, action) => {
                    state.error = action.error.message;
                    state.pending = false;
                }
            );
    },
});

export default eventReducer.reducer;
