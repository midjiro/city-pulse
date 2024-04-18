import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from 'features/user/userReducer';
import postReducer from 'features/post/postReducer';
import eventReducer from 'features/event/eventReducer';
import filterReducer from 'features/filter/filterSlice';

export const store = configureStore({
    reducer: {
        userReducer,
        postReducer,
        eventReducer,
        filterReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
