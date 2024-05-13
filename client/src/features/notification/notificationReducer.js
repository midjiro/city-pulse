import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { notifications: [] };

const notificationReducer = createSlice({
    name: 'notification',
    initialState: INITIAL_STATE,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        markAllAsReaded: (state) => {
            state.notifications = state.notifications.map((notification) => ({
                ...notification,
                unreaded: false,
            }));
        },
    },
});

export default notificationReducer.reducer;
export const notificationActions = notificationReducer.actions;
