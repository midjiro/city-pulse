import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { notifications: [] };

const notificationReducer = createSlice({
    name: 'notification',
    initialState: INITIAL_STATE,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
    },
});

export default notificationReducer.reducer;
export const notificationActions = notificationReducer.actions;
