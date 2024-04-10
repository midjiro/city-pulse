import { createSlice } from '@reduxjs/toolkit';
import { createEvent, getEventList } from './eventAPI';
import { checkActionType } from 'features/utils';
import { toastId } from 'features/constants/toasts';
import { toast } from 'react-toastify';

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
                const actionType = action.type.split('/')[1];
                toast('Event successfully published', {
                    toastId: toastId[actionType],
                });
                state.events.push(action.payload);
                state.pending = false;
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
                    const actionType = action.type.split('/')[1];
                    toast(action.error.message, {
                        toastId: toastId[actionType],
                    });
                    state.error = action.error.message;
                    state.pending = false;
                }
            );
    },
});

export default eventReducer.reducer;

export const selectEventList = (state) => [
    state.eventReducer.events,
    state.eventReducer.error,
    state.eventReducer.pending,
];

export const selectUserEventList = (state, user) => [
    state.eventReducer.events.filter(({ author }) => author._id === user._id),
    state.eventReducer.error,
    state.eventReducer.pending,
];

export const selectFoundEventList = ({ eventReducer }, searchQuery) => {
    if (!searchQuery) return [];

    return eventReducer.events.filter((event) => {
        const lowerCaseTitle = event.title.toLowerCase();

        return lowerCaseTitle.includes(searchQuery);
    });
};
